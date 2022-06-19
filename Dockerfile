FROM emscripten/emsdk

CMD ["bash"]
ARG INSTALL_ZSH=true
ARG UPGRADE_PACKAGES=true
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=1000

RUN useradd -s /bin/bash -m vscode \
 && groupadd docker \
 && usermod -aG docker vscode
 
RUN /bin/sh -c bash /tmp/library-scripts/common-debian.sh "${INSTALL_ZSH}" "${USERNAME}" "${USER_UID}" "${USER_GID}" "${UPGRADE_PACKAGES}" "true" "true"     && apt-get clean -y && rm -rf /var/lib/apt/lists/* /tmp/library-scripts


SHELL ["bash"]