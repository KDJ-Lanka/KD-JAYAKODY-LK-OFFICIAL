// =====================================================
// GALLERY AUTO-LOAD CONFIGURATION
// =====================================================
// Set the maximum number of images to auto-detect in each folder.
// Images should be named: 1.jpg, 2.jpg, 3.jpg, etc.
// Or you can use any naming pattern - the script will try all extensions.
// =====================================================

const galleryConfig = {
    // Maximum images to try loading from each folder
    maxImages: {
        workshops: 100,    // Will try 1.jpg to 100.jpg in workshops folder
        events: 50,
        conferences: 50,
        training: 50,
        awards: 20
    },

    // Image extensions to try (in order)
    extensions: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'JPG', 'JPEG', 'PNG', 'WEBP'],

    // Category display names
    categoryNames: {
        workshops: 'Workshops',
        events: 'Events',
        conferences: 'Conferences',
        training: 'Training',
        awards: 'Awards'
    }
};

// =====================================================
// AUTO-LOAD FUNCTION - No need to edit below
// =====================================================

// This will automatically build the image list when the page loads
// by detecting which images exist in each folder
