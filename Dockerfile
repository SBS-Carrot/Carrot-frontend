
FROM node
# 이미지 내에서 명령어를 실행할( 현 위치로 잡을) 디렉토리 설정
WORKDIR /app
WORKDIR usr/src/app
# 이미지 생성 과정에서 실행할 명령어

COPY package.json ./
RUN npm install
COPY ./ ./


# 컨테이너 실행시 실행할 명령어
CMD ["npm","run","start"]
