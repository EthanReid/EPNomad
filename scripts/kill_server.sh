ps aux  |  grep -i server  |  awk '{print $2}'  |  xargs sudo kill -9