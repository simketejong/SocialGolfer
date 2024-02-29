import json

def application(environ, start_response):
    if environ['REQUEST_METHOD'] == 'POST' and environ['PATH_INFO'] == '/save':
        try:
            request_body_size = int(environ.get('CONTENT_LENGTH', 0))
        except (ValueError):
            request_body_size = 0

        request_body = environ['wsgi.input'].read(request_body_size)
        data = json.loads(request_body)

        with open('golfers_data.json', 'w') as file:
            json.dump(data, file)

        start_response('200 OK', [('Content-Type', 'application/json')])
        return [b"Data opgeslagen"]

    elif environ['REQUEST_METHOD'] == 'GET' and environ['PATH_INFO'] == '/load':
        try:
            with open('golfers_data.json', 'r') as file:
                data = json.load(file)
                response_body = json.dumps(data)
        except FileNotFoundError:
            start_response('404 Not Found', [('Content-Type', 'application/json')])
            return [b"Bestand niet gevonden"]

        start_response('200 OK', [('Content-Type', 'application/json')])
        return [bytes(response_body, 'utf-8')]

    else:
        start_response('404 Not Found', [('Content-Type', 'text/plain')])
        return [b"Pagina niet gevonden"]
