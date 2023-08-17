# CHOCH Extension

---

Steps to re-create this extension:

1. Download https://github.com/kostik1337/CHOCH

2. Run npm install to download all dependencies

3. Install gulp with npm install -g gulp-cli

4. Download shader minifier 1.1.6 from https://github.com/laurentlb/Shader_Minifier/releases **Note:** The latest version doesn't work

5. Set SHADER_MINIFIER_CMD environment variable to the shader minifier executable

6. Update src/js/main.js line 54 to run main function after a timeout of 100 milliseconds. This fixes the "texImage2D: no canvas" error in setTextureCanvasData which made the menu invisible

7. Add the following line in src/glsl/f_shader.glsl after line 441:

```javascript
   if (speed.x < 0.001 && speed.x > -0.001 && speed.y < 0.001 && speed.y > -0.001) spiderAngle = PI/2.;
   // This fixes the MacOS bug where the screen went black when the player speed was zero (on death or on startup)
```

8. Run gulp build_release and copy the index.html to extension directory

9. Extension manifest, code & zip file to load the index.html
