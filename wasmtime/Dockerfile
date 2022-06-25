FROM emscripten/emsdk:3.1.9

RUN apt-get -y install \
	curl 

RUN useradd -s /bin/bash -m vscode \
 && groupadd docker \
 && usermod -aG docker vscode \
 && usermod -aG emscripten vscode
 
RUN curl https://wasmtime.dev/install.sh -sSf | bash

SHELL ["bash"]