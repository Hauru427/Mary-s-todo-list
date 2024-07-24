FROM ruby:3.2.2

# Node.jsとYarnをインストール
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g yarn

WORKDIR /myapp

# GemfileとGemfile.lockをコピー
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN bundle install

# package.jsonとyarn.lockをコピー
COPY package.json /myapp/package.json
COPY yarn.lock /myapp/yarn.lock

# Yarnのバージョンを確認（デバッグ用）
RUN yarn --version

# React関連の依存パッケージをインストール
RUN yarn install

# アプリのソースコードをコピー
COPY . /myapp

EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]
