#!/bin/bash

#Finds out how long it should start collecting songs from, if the user didn't enter then it doesn't know
#if [ $# -ne 1 ]; then
#	echo "Usage $0: Please enter how long you've been listening to music" 1>&2
#	exit 1;
#fi

#The directory for the finished images
finished_directory="FINISHED_IMAGES"

#set counter of number of elements in array
counter=0

#second counter to not add comma at last value
counter2=0

#The array of names
declare -a IMAGENAMES

#Creates temporary files for output
tout_file=$(mktemp -t /)

#Get Names
#find . \( ! -regex '.*/\..*' \) -maxdepth 1 -type f -exec ls -ls {} + | awk '{print $10}' | cut -d'.' -f1 | tail -n +2 >> $tout_file
ls -ls | awk '{print $10}' | cut -d'.' -f1 | tail -n +2 >> $tout_file

#Create the finished directory
mkdir $finished_directory

#Add them to and array
for img_name in `cat $tout_file`; do
  if [ $img_name != "pictureToJSON" ]; then
    temp_name0="${img_name//[1-9]}"
    temp_name="${temp_name0//[-]/ }"
    IMAGENAMES[$counter]=$temp_name
    counter=`expr $counter + 1`
  fi
done

echo -n "["

#for name in ${IMAGENAMES[@]}; do
for name in `cat $tout_file`; do
  if [ $name != "pictureToJSON" ]; then
    echo -n "{"
    #Get name
    #Don't want to reuse array because then it won't know the name of the file to copy
    temp_name0="${name//[1-9]}"
    temp_name="${temp_name0//[-]/ }"
    echo -n "name : '$temp_name',"
    #Get options
    need_option=true

    while [ $need_option == true ]; do
      var=$RANDOM
      var=$[ $var % $counter ]
      if [ "${IMAGENAMES[$var]}" != "$temp_name" ]; then
        option1="${IMAGENAMES[$var]}"
        echo -n "option1 : '$option1',"
        need_option=false
      fi
    done

    need_option=true

    while [ $need_option == true ]; do
      var=$RANDOM
      var=$[ $var % $counter ]
      if [ "${IMAGENAMES[$var]}" != "$temp_name" -a "${IMAGENAMES[$var]}" != "$option1" ]; then
        option2="${IMAGENAMES[$var]}"
        echo -n "option2 : '$option2',"
        need_option=false
      fi
    done

    need_option=true

    while [ $need_option == true ]; do
      var=$RANDOM
      var=$[ $var % $counter ]
      if [ "${IMAGENAMES[$var]}" != "$temp_name" -a "${IMAGENAMES[$var]}" != "$option1" -a "${IMAGENAMES[$var]}" != "$option2" ]; then
        option3="${IMAGENAMES[$var]}"
        echo -n "option3 : '$option3',"
        need_option=false
      fi
    done

    #Don't need because one is answer
    #need_option=true

    #while [ $need_option == true ]; do
    #  var=$RANDOM
    #  var=$[ $var % $counter ]
    #  if [ ${IMAGENAMES[$var]} != $name -a ${IMAGENAMES[$var]} != $option1 -a ${IMAGENAMES[$var]} != $option2 -a ${IMAGENAMES[$var]} != $option3 ]; then
    #    option4=${IMAGENAMES[$var]}
    #    echo "option4 : '$option4'"
    #    need_option=false
    #  fi
    #done

    #Get hash
    # bash generate random 32 character alphanumeric string (upper and lowercase) and 
    NEW_UUID=$(cat /dev/urandom | env LC_CTYPE=C tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)
    echo -n "hash : '$NEW_UUID'"

    #Check to see if it is the last object
    counter2=`expr $counter2 + 1`

    if [ $counter2 -eq $counter ]; then
      echo -n "}"
    else
      echo -n "},"
    fi

    #Rename and move images
    cp "$name.jpg" "$finished_directory/$NEW_UUID.jpg"
  fi
done

echo -n "]"
