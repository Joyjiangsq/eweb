// html5 案例代码  仅作保留
stay: function(){
  var  self = this;
  var form = this.$el.querySelector(".aaa");
  if(form["file"].files.length > 0) {
                // 寻找表单域中的 <input type="file" ... /> 标签
                var file = form["file"].files[0];
                console.log(file);
                // try sending
                var reader = new FileReader();
                reader.onloadstart = function() {
                  // 这个事件在读取开始时触发
                  console.log("onloadstart");
                  self.$el.querySelector(".bytesTotal").textContent = file.size;
                }
                reader.onprogress = function(p) {
                     // 这个事件在读取进行中定时触发
                     console.log("onprogress");
                     self.$el.querySelector(".bytesRead").textContent = p.loaded;
                }
                reader.onload = function() {
                    // 这个事件在读取成功结束后触发
                    console.log("load complete");
                }
                reader.onloadend = function() {
                    // 这个事件在读取结束后，无论成功或者失败都会触发
                   if (reader.error) {
                        console.log(reader.error);
                   } else {
                       self.$el.querySelector(".bytesRead").textContent = file.size;
                       console.log(file);
                       var fd = new FormData(form);
                      //  fd.append("fileToUpload", file);
                       console.log(fd);
                        var xhr = new XMLHttpRequest();
                        xhr.upload.addEventListener("progress", self.uploadProgress, false);
                        xhr.addEventListener("load", self.uploadComplete, false);
                        xhr.addEventListener("error", self.uploadFailed, false);
                        xhr.addEventListener("abort", self.uploadCanceled, false);

                        xhr.open("POST", "upload.jsp?fileName=" + file.name);
                        xhr.overrideMimeType("application/octet-stream");
                        xhr.send(fd);
                        xhr.onreadystatechange = function() {
                             if (xhr.readyState == 4) {
                                   if (xhr.status == 200) {
                                       console.log("upload complete");
                                       console.log("response: " + xhr.responseText);
                                   }
                             }
                        }
                   }
               }
               reader.readAsArrayBuffer(file);

  }
  else alert ("Please choose a file.");
},
