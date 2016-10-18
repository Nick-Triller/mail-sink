# Mail Sink

A smtp debugging email sink, inspired by [smtp-sink](https://github.com/jimmystridh/node-smtp-sink).

## Installation

```
npm install -g mail-sink
```

## Usage
```
  Usage: index [options]

  Options:

    -h, --help                    output usage information
    -V, --version                 output the version number
    -s, --smtp-port [number]      SMTP server port (1025 by default).
    -p, --http-port [number]      HTTP server port (8080 by default).
    -c, --dump-console [boolean]  Dump mails to the console (true by default).
    -d, --dump-files              Dump mails to files (default is true)
    -D, --dump-dir <path>         Directory into which the mail files are dumped (default is ./)
    -w, --whitelist [value]       Aceppt mails from these adresses only (no whitelist by default).
    -m --max [number]             Max number of e-mails to keep (200 by default)
```