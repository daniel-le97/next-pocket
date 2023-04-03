FROM golang:1.19.5-alpine3.17

RUN apk add -v build-base
RUN apk add -v ca-certificates
RUN apk add --no-cache \
    unzip \
    openssh

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY *.go ./

# Add this line to copy the "static" folder into the image
COPY static /app/static

RUN go build -o pb-build

EXPOSE 8080

CMD ["/app/pb-build", "serve", "--http=0.0.0.0:8080"]
