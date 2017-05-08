module.exports = {
  "src_folders" : ["./test/nightwatchTests"],
  "output_folder" : "./test/nightwatch-reports",
  "custom_commands_path" : "",
  "custom_assertions_path" : "",
  "globals_path" : "",

  "selenium" : {
    "start_process" : true,
    "server_path" : "./selenium-server-standalone-2.48.2.jar",
    "log_path" : false,
    "host" : "127.0.0.1",
    "port" : 4444,
    "cli_args":{
    	"webdirver.chrome.driver":"./chromedriver"
    }
  },

  "test_settings" : {
    "default" : {
      "launch_url" : "http://127.0.0.1:4444/wd/hub",
      "selenium_port"  : 4444,
      "selenium_host"  : "localhost",
      "silent": true,
      "screenshots" : {
        "enabled" : false,
        "path" : ""
      },
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    },

    "firefox" : {
      "desiredCapabilities": {
        "browserName": "firefox",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    }
  }
}
