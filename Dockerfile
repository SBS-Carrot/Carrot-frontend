FROM node:16.16.0
# 이미지 내에서 명령어를 실행할( 현 위치로 잡을) 디렉토리 설정
WORKDIR /app
# 이미지 생성 과정에서 실행할 명령어

COPY package.json ./
RUN npm install
COPY ./ ./


# 컨테이너 실행시 실행할 명령어
CMD ["npm","run","start"]

# 이미지 생성 명령어 (현파일과 같은 디렉토리에서)
# docker build -t (이미지명)

# 컨테이너 생성 & 실행 명령어
# docker run --name (컨테이너명) -v $(pwd):/app -p 8080:8080 (이미지명)