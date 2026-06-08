FROM node:24-trixie

COPY debian.sources /etc/apt/sources.list.d/debian.sources

RUN apt update && \
    apt install -y sudo && \
    echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers && \
    apt install -y locales && \
    sed -i 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    locale-gen

ENV LANG=en_US.UTF-8

RUN corepack enable pnpm

ENTRYPOINT ["sleep", "infinity"]
