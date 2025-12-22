import Sound from 'react-native-sound';

// Enable playback in silence mode
Sound.setCategory('Playback');

export const playSound = (filename: string) => {
    // Look for the file in the main bundle (mp3, wav, etc.)
    // Note: The user needs to add the file to the project's resources.
    // Android: android/app/src/main/res/raw/filename.mp3
    // iOS: Add to project in Xcode
    const sound = new Sound(filename, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        // loaded successfully
        sound.play((success) => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
            // Release to free resources
            sound.release();
        });
    });
};
