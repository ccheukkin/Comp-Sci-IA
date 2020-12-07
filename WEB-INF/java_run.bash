#!/bin/bash
java -cp "classes:`cat lib/classpath.txt`" `cat files_run.txt`