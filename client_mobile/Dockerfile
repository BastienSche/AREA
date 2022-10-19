FROM ubuntu:18.04

RUN \
  apt-get update && \
  apt-get upgrade -y && \
  apt-get install --no-install-recommends -y android-sdk default-jre default-jdk wget unzip

ENV ANDROID_HOME="/usr/lib/android-sdk/"
RUN wget https://dl.google.com/android/repository/commandlinetools-linux-6609375_latest.zip
RUN unzip commandlinetools-linux-6609375_latest.zip -d cmdline-tools
RUN mv cmdline-tools $ANDROID_HOME/

RUN rm -rf commandlinetools-linux-6609375_latest.zip

ENV PATH="${PATH}:${ANDROID_HOME}tools/:${ANDROID_HOME}platform-tools/:${ANDROID_HOME}/cmdline-tools/tools/bin/"
RUN yes | sdkmanager --licenses

COPY mobile-entrypoint.sh ./
RUN chmod +x ./mobile-entrypoint.sh