import subprocess

def application(environ, start_response):
    status = '200 OK'
    data=str(environ['wsgi.input'].read())
    data_bytes = data.encode('utf-8')
#    output = b'Hello World!'
    output = data_bytes
    response_headers = [('Content-type', 'text/plain'),
                        ('Content-Length', str(len(output)))]
    start_response(status, response_headers)
    file1 = open('/tmp/send.txt', 'w')
    file1.write(data[2:-1])
    file1.close()    
    data_str = str(data[2:-1])
    command = ['python', '/var/www/scripts/sort.py', f'--GivenArray={data_str}']
    result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    output=result.stdout.encode('utf-8')
    file1 = open('/tmp/receive.txt', 'w')
    file1.write(result.stdout)
    file1.close()    
    file1 = open('/tmp/error.txt', 'w')
    file1.write(result.stderr)
    file1.close()    
    return [output]