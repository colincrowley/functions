#******************************************************************************
#                    __       ___       __                                   **
#                   |__| |__|  |  |__| |  | |\ |                             **
#                   |     __|  |  |  | |__| | \|                             **
#                                                                            **
#******************************************************************************

#******************************************************************************
#   What:   
#
#   Name:   Colin Crowley
#
#   Date:   
#
#*****************************************************************************


#*****************************************************************************

#******************************************************************************
#   What:   Edits file to align '=' with '=' on next line
#
#   Name:   Colin Crowley
#
#   Date:   11-05-2016
#
#*****************************************************************************

from tempfile import mkstemp
import string
import re
import os

file1   = open('test.txt', 'r+')
total   = file1.read() 
total = ''
old     = ''
file1.seek(0)
for line in file1:
    if '=' in line :
        index_current = line.index('=')     
        if '=' in old : 
            index_previous = old.index('=')    
      #    if index_current == index_previous :
      #          file1.write(line)
      #          file1.truncate()
      #          old = line

            if index_current < index_previous :   
                while index_current < index_previous :    
                    before_equals, after_equals = line.split('=', 1)    
                    after_equals = ' =' + after_equals    
                    line = before_equals + after_equals    
                    index_current = line.index('=')   
                
            #else :  
            #    while index_current > index_previous :        
            #        before_equals, after_equals = old.split('=', 1)    
            #        after_equals = ' =' + after_equals    
            #        old = before_equals + after_equals    
            #        index_previous = old.index('=')    
            #    
            #    #old = old.replace(old,'')
            #    #file1.write(old)
            #    
            #    file1.write(line)
               
    total = total + line
    old = line

file1.seek(0)
file1.write(total)  
file1.truncate()
file1.close()

#*****************************************************************************

#*******************************************************************************
# author:MGM
#
def findFileName(path, filename):
    fnl=filename.lower()
    #walk through folder structure
    for root, subFolders, files in os.walk(path):
        for file in files:
            #if filename found give details
            f=file.lower()
            if fnl == f:
                print os.path.join(root,file)
                    
#def findFileName(path, filename):
#*******************************************************************************

#*******************************************************************************
# author:MGM
#
def findPartFileName(path, filename):
    fnl=filename.lower()
    #walk through folder structure
    for root, subFolders, files in os.walk(path):
        for file in files:
            #if filename found give details
            ff=file.lower()
            if ff.find(fnl) >= 0:
                print os.path.join(root,file)
                    
#def findPartFileName(path, filename):
#*******************************************************************************

#*******************************************************************************
# author:MGM
#
def delFileName(path, wildcard):
    fnl=wildcard.lower()
    #walk through folder structure
    for root, subFolders, files in os.walk(path):
        for file in files:
            #if filename found give details
            ff=file.lower()
            if ff.find(fnl) >= 0:
                str = os.path.join(root,file)
                #file.delete(str)
                print str
                    
#def delFileName(path, wildcard):
#*******************************************************************************



#*******************************************************************************
# author:MGM
#
def findAllFileExtensions(path):
    
    noFileExts = []
    recordFileExts = []

    tFound = False
    i=0

    #walk through folder structure
    for root, subFolders, files in os.walk(path):
        for file in files:
            #extract the file extension
            ss = file.split('.')
            ext = ss[len(ss)-1]
            #record file extensions and file name if no file extension
            tFound = False
            i=0
            if len(ss) > 1:
                if len(recordFileExts) > 0:
                    for e in recordFileExts:
                        if e == ext:
                            tFound = True
                            break
                        i += 1                            
                if tFound == False:
                    recordFileExts.append(ext)
            else:
                if len(noFileExts) > 0:
                    for e in noFileExts:
                        if e == ext:
                            tFound = True
                            break
                        i += 1                            
                if tFound == False:
                    noFileExts.append(ext)

    print "recordFileExts..."
    print recordFileExts

    print "noFileExts..."
    print noFileExts
#def findAllFileExtensions(path):
#*******************************************************************************

#*******************************************************************************
# author:MGM
#
def findAllFilesWithExtension(path, ext):
    el=ext.lower()
    print el
    #walk through folder structure
    for root, subFolders, files in os.walk(path):
        print files
        for file in files:
            #extract the file extension
            ss = file.split('.')
            e = ss[len(ss)-1]
            print ss
            print e
            #record file extensions and file name if no file extension
            if len(ss) > 1:
                if e.lower() == el:
                    print os.path.join(root,file)
                    
#def findAllFilesWithExtension(path, ext):
#*******************************************************************************

