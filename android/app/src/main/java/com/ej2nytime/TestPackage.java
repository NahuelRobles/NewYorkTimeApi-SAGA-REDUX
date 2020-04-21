package com.ej2nytime;
 
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.ej2nytime.TestModule; //name module 
 
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
 
public class TestPackage implements ReactPackage {
 
    @Override
    public List<ViewManager> createViewManagers(final ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(final ReactApplicationContext reactContext) {
        final List<NativeModule> modules = new ArrayList<>();
        //this is where you register the module
        modules.add(new TestModule(reactContext)); //modulo
        return modules;
    }
}