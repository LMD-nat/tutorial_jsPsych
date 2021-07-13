##### interest questionnaire cleaning
library(readr)
library(tidyverse)
interest_questionnaire <- read_csv("interest-questionnaire.csv")
# I only need an id, stimulus, response, and the trial index
# omit the square task for now
q<- interest_questionnaire %>% select(subject, trial_type, stimulus, response)
library(splitstackshape)
d<-cSplit(q, 1:ncol(q), sep=",", stripWhite=TRUE, type.convert=FALSE)
# first, get rid of repeat responses
d[] <- lapply(d, gsub, pattern='"', replacement='')
# clean up manually and anonymize, this is getting silly
write.csv(d, "d.csv", row.names = FALSE)
d <- read_csv("d_anon.csv")
duplicates <- subset(d, d$response_01!="repeatsurvey:Yes")
duplicates <- table(duplicates$subject_01)
naughty = data.frame(subject_01 = c('17ol4lx', '37rfoa4', '6592fvp', '6ej5z0k', '6jodent', '718cvt0', '7ehj0yy', '7he8oy6', '7udh56g', '7xr6m9z', '84k2tvo', '8vbpuvt', '8zof7xf', 'afaq0x6', 'bj7bhxs', 'coa7x84', 'curmbm5', 'd0qlbp9', 'g8xf97q', 'gjd5c6a', 'gtgzqzs', 'j1m0hyr', 'j6js9o4', 'k6mhx86', 'klvu7ac', 'l5fwlh6', 'm03ptmf', 'nkb0bnz', 'nwce7h0', 'oomxays', 'p99unow', 'pt1m7sj', 'suf42s0', 'tcau1cw', 'torjmhs', 'uctbad0', 'wq0npaa', 'wu0xy9a', 'y3c3z96', 'ze3lumy'), no = c(1:40))
library(dplyr)
a <- anti_join(d, naughty)
# 24 participants who did the study correctly, I thought there would be more naughties than keepers,
# looks like I might have done this backward, my bad
a$subject_01

##### Demographics
keepers = data.frame(subject_01 = c('n2bk37z', 'ykl5u58', 'f2mrovv', 'a6y6d62', '1eeoj24', 'bru0r53', '6ep7mlf', '1ek894t', 'hu0dmzb', '89xarwd', 'ph6obeu', 'mw26jgj', 'hn20zga', '1gk816k', 'hggrbvd', '8uc7bnn', 'dk8ynbd', 'by48fln', 'wpvetll', 'wpvetll', 'auea4zt', 'ckcgqfk', 'qnug2a4', 'f24rpuv', 'rqj8urx'))
# now separate and analyse by the question type, this will be demographic info
demog <- subset(d, trial_type_01 == 'survey-multi-choice')
demog <- subset(demog, response_01 == 'repeatsurvey:Yes')

demog <- demog %>% select(subject_01, response_01, response_02, response_03, response_04)
# prog = Do you feel like you need to know some form of programming or coding to be successful in your studies or career?
# anyprog = Do you have existing experience in <b>ANY</b> type of programming or coding?
# classoff = Would you enroll in an introductory programming or coding class designed for the psychology department if it was offered to you?
demog[] <- lapply(demog, gsub, pattern='prog:', replacement='')
demog[] <- lapply(demog, gsub, pattern='any', replacement='')
demog[] <- lapply(demog, gsub, pattern='classoff:', replacement='')
# rename these columns
colnames(demog) <- c("subject","repeat", "prog_need", "prog_exp", "class_enth")
demog$prog_need <- ordered(demog$prog_need, levels = c("Strongly Disagree", "Somewhat Disagree", "Neutral", "Somewhat Agree", "Agree", "Strongly Agree"))
# plot prog
a1 <- ggplot(demog, aes(x = factor(prog_need))) +
  geom_bar(fill = "#FF6666") +
  theme_classic()
a1 + ggtitle("Participants's levels of agreement that you \n need programming experience for psych") +
  xlab("Response") + ylab("Count")
# plot prog_exp
a2 <- ggplot(demog, aes(x = factor(prog_exp))) +
  geom_bar(fill = "#FF6600") +
  theme_classic()
a2 + ggtitle("Existing programming experience among participants") +
  xlab("Response") + ylab("Count")
# plot class enthusiasm
a3 <- ggplot(demog, aes(x = factor(class_enth))) +
  geom_bar(fill = "#FF3333") +
  theme_classic()
a3 + ggtitle("Participants who would attend an \n intoductory programming course in the department") +
  xlab("Response") + ylab("Count")

##### Status
status <- d %>% select(subject_01, stimulus_01, response_01)
colnames(status) <- c("subject","stim", "response")
# <p>Alright! Let's keep going. Which of these options best describes you?<br></p>
status <- subset(status, stim == "<p>Alright! Let's keep going. Which of these options best describes you?<br></p>")
status <- merge(demog, status, by = "subject")
status$stud_status <- recode(status$response, "0" = "Undergraduate Student", "1" = "Recently Graduated", "2" = "Grad Student")

a4 <- ggplot(status, aes(x = factor(stud_status))) +
  geom_bar(fill = "#FFC300") +
  theme_classic()
a4 + ggtitle("Where participants are in their education") +
  xlab("Status") + ylab("Count")

##### Programming Experience
sliders <- d %>% select(subject_01, trial_type_01, response_01)
sliders <- subset(sliders, trial_type_01 == "html-slider-response")
colnames(sliders) <- c("subject","trial", "slider_response")
sliders <- merge(sliders, demog, by = "subject")
sliders$slider_response <- as.numeric(sliders$slider_response)

a5 <- ggplot(sliders, aes(slider_response)) +
  geom_histogram() +
  geom_freqpoly(binwidth = 25) +
  theme_classic()
a5 + ggtitle("Self rated programming experience (out of 100)") +
  xlab("Programming Experience") + ylab("Count")

##### Topics and Goals
topics <- d %>% select(subject_01, trial_type_01, response_01, response_02, response_03, response_04, 
                       response_05, response_06, response_07, response_08, response_09, response_10, response_11)
topics <- subset(topics, trial_type_01 == "survey-multi-select")
topics <- merge(stopics, demog, by = "subject")
interests = data.frame(subject_01 = topics$subject_01, topics_research = c("Clinical, Language, Cognitive-Science, Neuroscience", "Clinical, Psychometrics, Personality", "Cognitive-Science, Development", 
                                                                           "Cognitive-Science, Development, Psychometrics, Neuroscience", "Language, Development, Psychometrics, Personality", "Clinical, Development", 
                                                                           "Language, Cognitive-Science, Personality, Neuroscience", "Clinical, Cognitive-Science, Neuroscience", "Clinical, Psychometrics, Personality, Neuroscience", 
                                                                           "Clinical, Development, Personality", "Clinical, Cognitive-Science, Development, Psychometrics, Personality", "Clinical, Cognitive-Science, Neuroscience",
                                                                           "Clinical, Language, Cognitive-Science, Development, Psychometrics, Neuroscience", "Language, Cognitive-Science", "Cognitive-Science, Psychometrics", "Personality", 
                                                                           "Clinical, Cognitive-Science, Neuroscience", "Personality", "Clinical, Cognitive-Science, Development, Psychometrics, Neuroscience", "Development, Psychometrics",
                                                                           "Clinical, Psychometrics, Personality", "Clinical, Psychometrics, Personality, Neuroscience", "Clinical, Cognitive-Science, Neuroscience", "Personality", 
                                                                           "Clinical, Psychometrics, Personality, Neuroscience, Cognitive-Science"
                                                                          ))


m <- as.matrix(interests$topics_research)
library(stringr)
interests = data.frame(topics_research = c("Language", "Neuroscience", "Cognitive-Science", "Development", "Psychometrics", "Clinical", "Personality"), topics_research = c(sum(str_count(m, "Language")), sum(str_count(m, "Neuroscience")), sum(str_count(m, "Cognitive-Science")),
                                                                           sum(str_count(m, "Development")), sum(str_count(m, "Psychometrics")), sum(str_count(m, "Clinical")), sum(str_count(m, "Personality"))))
colnames(interests) <- c("topics","freq")
library(ggwordcloud)
# this is a wordcloud of the biggest/most popular topics 
ggplot(interests, aes(label = topics, size = freq, color = topics)) +
  geom_text_wordcloud_area() +
  scale_size_area(max_size = 10) +
  theme_minimal()


