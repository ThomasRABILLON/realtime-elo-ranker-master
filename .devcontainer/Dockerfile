FROM debian:bullseye-slim

LABEL maintainer="ThomasRABILLON"
LABEL maintainer.email="thomas.rabillon@etu.univ-orleans.fr"

RUN apt update
RUN apt install -y curl git

# Install NVM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Install Node.js
RUN /bin/bash -c "source /root/.bashrc && nvm install 22 && nvm use 22 && nvm alias default 22"
# Install PNPM
RUN /bin/bash -c "source /root/.bashrc && corepack enable pnpm && corepack use pnpm@8"

# Clean apt cache
RUN apt clean