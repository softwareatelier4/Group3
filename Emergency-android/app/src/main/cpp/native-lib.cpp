#include <jni.h>
#include <string>

extern "C"
JNIEXPORT jstring JNICALL
Java_ch_usi_se_group3_emergency_1android_emergency_select_stringFromJNI(
        JNIEnv* env,
        jobject /* this */) {
    std::string hello = "Hello from C++";
    return env->NewStringUTF(hello.c_str());
}
