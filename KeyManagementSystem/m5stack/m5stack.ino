#include <M5Core2.h>
#include <time.h>
#include <WiFiMulti.h>

//WiFi Settings
const char ssid[] = ""; // WiFi ssid
const char passwd[] = ""; // WiFi passwd
WiFiMulti wifiMulti;

//Time Settings
const char* ntpServer = "ntp.nict.jp";
const long gmtOffset_sec = 9 * 3600;
const int daylightOffset_sec = 0;
RTC_DateTypeDef RTC_DateStruct; // Data
RTC_TimeTypeDef RTC_TimeStruct; // Time
static const char *wd[7] = {"Sun","Mon","Tue","Wed","Thr","Fri","Sat"};
struct tm timeinfo;
String dateStr;
String timeStr;


int state = 0; // 0:Lock 1:Unlock
const int lock = 0;
const int unlock = 1;

void displayClean(){
  M5.Lcd.fillRect(0, 0, 320, 200, BLACK);
  M5.Lcd.setTextColor(WHITE);
  M5.Lcd.setTextSize(2);
  M5.Lcd.drawString("Lock", 10, 210);
  M5.Lcd.drawString("Unlock", 125, 210);
  M5.Lcd.drawString("View log", 220, 210);
  M5.Lcd.setCursor(0, 20);
}

String stateMsg = "";
void stateDisplay() {
  if(state == lock){
    M5.Lcd.fillRect(0, 0, 320, 200, GREEN);
    M5.Lcd.setTextColor(BLACK);
    stateMsg = "Locked!";
  }else{
    M5.Lcd.fillRect(0, 0, 320, 200, RED);
    M5.Lcd.setTextColor(WHITE);
    stateMsg = "Unlocked...";
  }

  M5.Lcd.println(stateMsg);
}

void getTimeFromNTP(){
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
  while(!getLocalTime(&timeinfo)){
    delay(1000);
  }
}

void setNTP2RTC(){
  getTimeFromNTP();
  getLocalTime(&timeinfo);
  
  // read RTC
  M5.Rtc.GetTime(&RTC_TimeStruct);
  M5.Rtc.GetDate(&RTC_DateStruct);
  
  // --- to over write date&time
  RTC_DateStruct.Year = timeinfo.tm_year + 1900;
  RTC_DateStruct.Month = timeinfo.tm_mon + 1;
  RTC_DateStruct.Date = timeinfo.tm_mday;
  RTC_DateStruct.WeekDay = timeinfo.tm_wday;
  M5.Rtc.SetDate(&RTC_DateStruct);
  
  RTC_TimeStruct.Hours = timeinfo.tm_hour;
  RTC_TimeStruct.Minutes = timeinfo.tm_min;
  RTC_TimeStruct.Seconds = timeinfo.tm_sec;
  M5.Rtc.SetTime(&RTC_TimeStruct);
}

RTC_TimeTypeDef timestamps[10];
int stateLogs[10];
void writeLog(int stateData, RTC_TimeTypeDef timestamp){
  for(int i=8; i>=0; i--){
    timestamps[i+1] = timestamps[i];
    stateLogs[i+1] = stateLogs[i];
  }

  timestamps[0] = timestamp;
  stateLogs[0] = stateData;
}

void setup() {
  M5.begin();

  wifiMulti.addAP(ssid, passwd);
  
  displayClean();
  stateDisplay();
}

void loop(){
  //左のボタン　→　施錠
  if(M5.BtnA.wasPressed() && state == unlock){
    state = lock;
    stateDisplay();
    M5.Rtc.GetTime(&RTC_TimeStruct);
    writeLog(state, RTC_TimeStruct);
  }

  //右のボタン　→　解錠
  if(M5.BtnB.wasPressed() && state == lock){
    state = unlock;
    stateDisplay();
    M5.Rtc.GetTime(&RTC_TimeStruct);
    writeLog(state, RTC_TimeStruct);
  }

  //ロック解除履歴を確認する。
  if(M5.BtnC.wasPressed()){
    displayClean();
    for(int i=0; i<10; i++){
      M5.Lcd.print(i+1);
      M5.Lcd.print(". ");
      M5.Lcd.printf("%02d:%02d:%02d ", timestamps[i].Hours, timestamps[i].Minutes, timestamps[i].Seconds);

      String logMsg = "";
      if(stateLogs[i] == lock){
        logMsg = "Locked";
      }else if(stateLogs[i] == unlock){
        logMsg = "Unlocked";
      }else{
        logMsg = "err";
      }
      M5.Lcd.println(logMsg);
    }
  }

  M5.Lcd.setCursor(0, 20);
  M5.update();
}
