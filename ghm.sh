#!/bin/bash
echo -e "[y/n]? \c"
read confirm
if [ $confirm = "y" ]
then
	git add --all
	git commit -m"$1"
	git push origin master
	echo done!
else
	echo cancelled!
fi