import subprocess

def application(environ, start_response):
    status = '200 OK'
    data=str(environ['wsgi.input'].read())
    data_bytes = data.encode('utf-8')
#    output = b'Hello World!'
    output = data_bytes
#    response_headers = [('Content-type', 'application/json'),
#                        ('Content-Length', str(len(output)))]
    file1 = open('/tmp/array_send.txt', 'w')
    file1.write(data[2:-1])
    file1.close()    
    data_str = str(data[2:-1])
    command = ['python', '/var/www/scripts/sort.py', f'--players_per_flight={data_str}']
    result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    file1 = open('/tmp/array_receive.txt', 'w')
    file1.write(result.stdout)
    file1.close()    
    file1 = open('/tmp/array_error.txt', 'w')
    file1.write(result.stderr)
    file1.close()    
    response_headers = [('Content-type', 'application/json')] 
    start_response(status, response_headers)   
    terug=result.stdout.encode()
    return [terug]
