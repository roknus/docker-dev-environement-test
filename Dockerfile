FROM ubuntu:22.04

SHELL ["/bin/bash", "-c"]

RUN apt-get update
RUN apt-get -y install \
	curl \
	git \
	python3 \
	xz-utils \
	bzip2

# Get the emsdk repo
RUN git clone https://github.com/emscripten-core/emsdk.git /emsdk

# Enter emsdk directory
WORKDIR /emsdk

# Fetch the latest version of the emsdk (not needed the first time you clone)
RUN git pull

# Download and install the latest SDK tools.
RUN ./emsdk install latest

# Make the "latest" SDK "active" for the current user. (writes .emscripten file)
RUN ./emsdk activate latest

RUN useradd -s /bin/bash -m vscode \
 && groupadd docker \
 && usermod -aG docker vscode

USER vscode


# Activate PATH and other environment variables in the current terminal
#RUN source ./emsdk_env.sh
ENV PATH "$PATH:/emsdk"
ENV PATH "$PATH:/emsdk/upstream/emscripten"
ENV PATH "$PATH:/emsdk/node/14.18.2_64bit/bin"

ENV EMSDK "/emsdk"
ENV EM_CONFIG "/emsdk/.emscripten"
ENV EMSDK_NODE "/emsdk/node/14.18.2_64bit/bin/node"
 
RUN curl https://wasmtime.dev/install.sh -sSf | bash