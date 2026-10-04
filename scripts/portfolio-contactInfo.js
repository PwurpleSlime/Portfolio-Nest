document.querySelectorAll('.copy-text').forEach(el => {
    let isCooldown = false; // prevents spamming

    el.addEventListener('click', async () => {
        if (isCooldown) return; // ignores clicks while active

        const text = el.dataset.copy;
        
        isCooldown = true;
        try {
            // modern day clipboard's API
            await navigator.clipboard.writeText(text);
        } catch (err) {
            // saftey for older browsers 
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            try {
                document.execCommand('copy');
            } catch {}
            document.body.removeChild(textarea);
        }

        // Create Tooltip
        let tooltip = document.createElement('span');
        tooltip.className = 'copy-tooltip show';
        tooltip.innerText = 'Copied!';
        el.parentNode.appendChild(tooltip);

        // Remove Tooltip
        setTimeout(() => {
            tooltip.classList.remove('show');

            setTimeout(() => {
                tooltip.remove();
                isCooldown = false;
            }, 300);
        }, 3000);
    });
});