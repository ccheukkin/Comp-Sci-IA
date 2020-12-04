#!/bin/bash
for file in `cat files_compile.txt`
do
javac -cp `cat lib/classpath.txt` src/$file -d classes
done