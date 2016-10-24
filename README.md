# Mail Sink

A smtp debugging email sink, inspired by [smtp-sink](https://github.com/jimmystridh/node-smtp-sink).

## Installation

```
npm install -g mail-sink
```

## Features
- Parsing and rendering mails on a website
- Dumping mails to file
- CSS encapsulation

## Usage
```
  Usage: index [options]

  Options:

    -h, --help                output usage information
    -V, --version             output the version number
    -s, --smtp-port [number]  SMTP server port (1025 by default).
    -p, --http-port [number]  HTTP server port (8080 by default).
    -q, --quiet               Do not dump mails to the console (false by default).
    -w, --whitelist [value]   Aceppt mails from these adresses only (no whitelist by default).
    -m --max [number]         Max number of e-mails to keep (200 by default)
    -d --dump [directory]     Dump mails to files (no dumps by default)
```

## Dump to file
The filenames are constructed as follows: `timestamp-randomInt.json`, e.g. `1477324594663-60741.json`.

## Docker
mail-sink is avaiable on [Docker Hub](https://hub.docker.com/r/nicktriller/mail-sink/)
The exposed ports are the default ports (8080 for http and 1025 for smtp).
`/usr/mails` is a volume (see Dockerfile).

Example: Running the image with mail logging to file:
```shell
nick@ubuntu:~/mails$ docker run -it --name mail-sink -p 80:8080 -p 25:1025 c9dd2ce8185e -d ./ -v /usr/src/app ~/mails
```

## TODO
- Simulate failure modes

## License
MIT License

Copyright (c) 2016 Nick Triller

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
