FROM python:3.9-alpine

#installs dependencies
RUN pip install --upgrade pip
COPY ./db/requirements.txt /var/tmp/requirements.txt
RUN pip3 install -r /var/tmp/requirements.txt