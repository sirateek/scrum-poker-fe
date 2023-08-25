#!/bin/bash
JSON_STRING='window.APP_CONFIG = { \'


# Set = as delimiter
IFS='='

while read line ; do
    read -a strarr <<< $line
    if [[ $strarr[0] = VITE* ]]
    then
        JSON_STRING+=${strarr[0]}
        JSON_STRING+=': "'
        JSON_STRING+=${strarr[1]}
        JSON_STRING+='",\'
    fi
done <<< $(cat /usr/share/nginx/.env)

JSON_STRING+="}"

echo $JSON_STRING

sed -i "s@// CONFIGURATIONS_PLACEHOLDER@${JSON_STRING}@" /usr/share/nginx/html/index.html
exec "$@"