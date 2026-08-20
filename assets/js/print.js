/**
 * KREIS ICT Resources - Print Functionality
 */

// Print current page
function printPage() {
    window.print();
}

// Print specific document in new window
function printDocument(url) {
    const printWindow = window.open(url, '_blank');
    printWindow.onload = function() {
        printWindow.print();
    };
}

// Download PDF file
function downloadPDF(url, filename) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || url.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Print all files in a section
function printSection(sectionUrl) {
    if (confirm('This will open all documents in this section for printing. Continue?')) {
        window.open(sectionUrl, '_blank');
    }
}

// Generate QR Code (simple text-based for now)
function generateQR(text) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;
}

// Copy link to clipboard
function copyLink(url) {
    navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Share via WhatsApp
function shareWhatsApp(text, url) {
    const message = encodeURIComponent(`${text} - ${url}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
}

// Share via Email
function shareEmail(subject, body) {
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
}

// Toggle print preview mode
function togglePrintPreview() {
    document.body.classList.toggle('print-preview');
    if (document.body.classList.contains('print-preview')) {
        window.print();
        document.body.classList.remove('print-preview');
    }
}

// Print with custom header/footer
function printWithHeader(title, subtitle) {
    const printContent = document.querySelector('.print-content') || document.querySelector('main');
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
            <link rel="stylesheet" href="assets/css/style.css">
            <link rel="stylesheet" href="assets/css/print.css">
            <style>
                body { font-family: 'Times New Roman', serif; }
                .print-header { text-align: center; margin-bottom: 2rem; }
                .print-header h1 { font-size: 18pt; margin-bottom: 0.5rem; }
                .print-header p { font-size: 12pt; color: #666; }
            </style>
        </head>
        <body>
            <div class="print-header">
                <h1>Karnataka Residential Educational Institutions Society</h1>
                <p>${title}</p>
                ${subtitle ? `<p>${subtitle}</p>` : ''}
            </div>
            ${printContent.innerHTML}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.onload = function() {
        printWindow.print();
    };
}

// Initialize print functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add print button click handlers
    document.querySelectorAll('[data-print]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('data-print');
            printDocument(url);
        });
    });

    // Add download button click handlers
    document.querySelectorAll('[data-download]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('data-download');
            const filename = this.getAttribute('data-filename');
            downloadPDF(url, filename);
        });
    });

    // Add share button click handlers
    document.querySelectorAll('[data-share]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('data-share');
            const url = window.location.href;
            const title = document.title;
            
            switch(platform) {
                case 'whatsapp':
                    shareWhatsApp(title, url);
                    break;
                case 'email':
                    shareEmail(title, `Check out this resource: ${url}`);
                    break;
                case 'copy':
                    copyLink(url);
                    break;
            }
        });
    });

    // Keyboard shortcut for printing (Ctrl+P is default, but we add Ctrl+Shift+P for our custom print)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'P') {
            e.preventDefault();
            printPage();
        }
    });
});

// Export functions for use
window.KREISPrint = {
    printPage,
    printDocument,
    downloadPDF,
    printSection,
    generateQR,
    copyLink,
    shareWhatsApp,
    shareEmail,
    printWithHeader
};
