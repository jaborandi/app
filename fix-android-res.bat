@ECHO OFF

MD "platforms\android\res\drawable-hdpi"
XCOPY /Y /S "resources\android\icon\drawable-hdpi-icon.png" "platforms\android\res\drawable-hdpi\*"
REN "platforms\android\res\drawable-hdpi\drawable-hdpi-icon.png" "icon.png"
DEL "platforms\android\res\drawable-hdpi\drawable-hdpi-icon.png"

MD "platforms\android\res\drawable-ldpi"
XCOPY /Y /S "resources\android\icon\drawable-ldpi-icon.png" "platforms\android\res\drawable-ldpi\*"
REN "platforms\android\res\drawable-ldpi\drawable-ldpi-icon.png" "icon.png"
DEL "platforms\android\res\drawable-ldpi\drawable-ldpi-icon.png"

MD "platforms\android\res\drawable-mdpi"
XCOPY /Y /S "resources\android\icon\drawable-mdpi-icon.png" "platforms\android\res\drawable-mdpi\*"
REN "platforms\android\res\drawable-mdpi\drawable-mdpi-icon.png" "icon.png"
DEL "platforms\android\res\drawable-mdpi\drawable-mdpi-icon.png"

MD "platforms\android\res\drawable-xhdpi"
XCOPY /Y /S "resources\android\icon\drawable-xhdpi-icon.png" "platforms\android\res\drawable-xhdpi\*"
REN "platforms\android\res\drawable-xhdpi\drawable-xhdpi-icon.png" "icon.png"
DEL "platforms\android\res\drawable-xhdpi\drawable-xhdpi-icon.png"

MD "platforms\android\res\drawable-xxhdpi"
XCOPY /Y /S "resources\android\icon\drawable-xxhdpi-icon.png" "platforms\android\res\drawable-xxhdpi\*"
REN "platforms\android\res\drawable-xxhdpi\drawable-xxhdpi-icon.png" "icon.png"
DEL "platforms\android\res\drawable-xxhdpi\drawable-xxhdpi-icon.png"

MD "platforms\android\res\drawable-xxxhdpi"
XCOPY /Y /S "resources\android\icon\drawable-xxxhdpi-icon.png" "platforms\android\res\drawable-xxxhdpi\*"
REN "platforms\android\res\drawable-xxxhdpi\drawable-xxxhdpi-icon.png" "icon.png"
DEL "platforms\android\res\drawable-xxxhdpi\drawable-xxxhdpi-icon.png"
PAUSE
