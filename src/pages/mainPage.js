const mainPageHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Red vs Blue</title>
    <link rel="icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACABAMAAAAxEHz4AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAB5QTFRFnENAbE9nmERDbU9mQVqIRFmGmkRCbE9mQ1qHa09nqp+pUQAAAkpJREFUeJyl1jtKAwEQxvHdFVYEYUVsU8gWaRRNJDaW1hYewEIsUgoRPYkH8Qg5QEAvIsQbmOc+5/HNjJ2KP4b177emSewjTWM/n42DQDmKAflVEQOmg3kIyG6PkxBQjpYxYFIkISC9T2LA2XUM2BwQALLxSQx4+VuGgHy2SEJA+TwPAdlNkYSAg8dlDNg0EAC2DQSA6gAnUJ7Xt3h+fjVEMWA1RCFgH6Eb2EfoBiZF4xMHUDfgBOoGfED7ADuwGyI/sBsiN9BqwAM0I/QA67dhCKiGyAu0G7ADnQbsQP8AG9AYIheQv37HgOdyHgLy0wviqwZg+EQcYAHeiSdgAY7uyC/jwOdXDGAOgIFs9hMDhpfdP0MbQEZoAcgIDUD2seC+hQGHD8wTQAGmARjgGoAB4QAIGA6EbwJA9sY1AALTX/ZXAAH0EBkAeohwQH4CACBEiAFSAwggRYgA7BChADtEIMAPEQjwQ4QBwhBhgP4EFIB+G+KA2oAGaBFqAHSAAOgRKoA8RDqgDJEOKEOkAtoQqYA2RCoANSAAWAMCAB/AAOLbEACAIZIBYIhEAI2QBdAIWQAZIgnAG2AAvAEasB3QB8Ah4gFwiFjA1AAFWCKkAORtKALwEHGArYE+YGygD9gPaAOGISIByxCRgLmBDmCOsAuYhogCTENEAI4G2oCjgRbgPKACrEPUA5B/SiXAFWETcEXYAOxD1AHsQ9QBnA1UgLeBCggcsAE8Q9QE4H9KOcD6NuwCviFqAL4hqoHYE1gBgQi3QKSB9cc/MA12PrJyG3sAAAAASUVORK5CYII=" type="image/png">
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <style>
    body {
        font-family: 'JetBrains Mono', monospace;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0;
        padding: 0;
        min-height: 100vh;
        overflow-x: hidden;
        overflow-y: auto;
        transition: background-color 0.1s ease;
    }

    #counter-bar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 10vh;
        display: flex;
        align-items: center;
        z-index: 1000;
        background-color: #f0f0f0;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        font-size: x-large;
        overflow: hidden;
    }

    #red-bar {
        height: 100%;
        background-color: #A83C3C;
        transition: width 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;
        box-sizing: border-box;
        color: white;
        font-weight: bold;
        font-family: 'JetBrains Mono', monospace;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    #blue-bar {
        height: 100%;
        background-color: #3A5B8C;
        transition: width 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 10px;
        box-sizing: border-box;
        color: white;
        font-weight: bold;
        font-family: 'JetBrains Mono', monospace;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    #grid-container {
        margin-top: 10vh;
        width: 100%;
        height: 90vh;
        overflow-x: hidden;
        overflow-y: auto;
        box-sizing: border-box;
        position: relative;
    }

    #container {
        position: absolute;
        width: 100vw;
        height: 35000000px;
    }

    .checkbox-wrapper {
        position: absolute;
        width: var(--checkbox-width, 30px);
        height: 30px;
        overflow: hidden; /* Add this line */
    }

    .checkbox {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 100%;
        width: 100%;
        z-index: 1;
        margin: 0;
        padding: 0;
    }

    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 101%; /* Increase width slightly */
        background-color: #3A5B8C;
        pointer-events: none;
    }

    .checkbox:checked ~ .checkmark {
        background-color: #A83C3C;
    }

    #nick-link {
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(255,255,255,0.5);
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        font-family: 'JetBrains Mono', monospace;
        font-size: 14px;
    }

    #nick-link a {
        color: #333;
        text-decoration: none;
    }

    #nick-link a:hover {
        text-decoration: underline;
    }
    </style>
</head>
<body>
    <div id="counter-bar">
        <div id="red-bar"></div>
        <div id="blue-bar"></div>
    </div>
    <div id="grid-container">
        <div id="container"></div>
    </div>
    <div style="position: fixed; bottom: 20px; right: 20px; background: rgba(255,255,255,0.5); padding: 10px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1)">
        <input type="number" min="0" max="999999" id="jumpToNumber" placeholder="1234" style="margin-right: 5px">
        <button id="jumpButton">Go</button>
    </div>
    <div id="nick-link">
        <a href="https://nick.gabler.app" target="_blank">@ me</a>
    </div>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        let ws;
        let reconnectAttempts = 0;
        let maxReconnectAttempts = 5;
        let reconnectDelay = 1000;
        let totalCheckboxes = 1000000;
        let state = new Array(totalCheckboxes).fill(false);
        let stateInitialized = false;
        let initializationTimer;
        let initializationTimeout = 50000; // 5 seconds
        let chunkTimeout = 5000; // 50 miliseconds seconds per chunk
        let receivedChunks = 0;
        let totalChunks = 0;
        let chunkBuffer = new Map();
        const checkboxHeight = 30;
        let checkboxesPerRow;
        const checkboxWidth = 30;
        const gridContainer = document.getElementById('grid-container');
        const container = document.getElementById('container');
        let lastScrollTop = 0;
        let renderTimeout;
        let scrollDirection = 0; // 0: static, 1: scrolling down, -1: scrolling up
        let batchedUpdates = new Map();
        const batchInterval = 7.8125; // 7.8125 milliseconds, should match BATCH_INTERVAL on the server
        let batchUpdateTimer = null;
        let isDisconnecting = false;
        let checkedCount = Math.floor(totalCheckboxes / 2); // Start with half checked
        let realCheckedCount = 0; // Add this line to track the actual checked count
        let counterUpdateTimer = null;
        const redBar = document.getElementById('red-bar');
        const blueBar = document.getElementById('blue-bar');
        let visibleCheckboxes = new Map();
        const bufferRows = 5; // Increase buffer size
        const virtualScrollContainer = document.createElement('div');
        virtualScrollContainer.style.position = 'relative';
        container.appendChild(virtualScrollContainer);

        function connect() {
          ws = new WebSocket('wss://wss.gabler.app/ws');
      
          ws.onopen = () => {
              console.log('WebSocket connection opened');
              reconnectAttempts = 0;
              reconnectDelay = 1000;
              initializeState();
          };
      
          ws.onmessage = (event) => {
              if (event.data instanceof Blob) {
                  event.data.arrayBuffer().then(buffer => {
                      const view = new DataView(buffer);
                      const messageType = view.getUint8(0);
                      if (messageType === 0) {
                          // Single update
                          const index = view.getUint32(1);
                          const value = view.getUint8(5) !== 0;
                          updateCheckbox(index, value);
                      } else if (messageType === 254) {
                          // InitChunk
                          const chunkIndex = view.getUint32(1);
                          const totalChunks = view.getUint32(5);
                          const chunkData = new Uint8Array(buffer.slice(9));
                          handleInitChunk(chunkIndex, totalChunks, chunkData);
                      } else if (messageType === 253) {
                          // Graceful disconnect
                          console.log('Received graceful disconnect message from server');
                          handleGracefulDisconnect();
                      } else {
                          // Batch update
                          const updates = [];
                          for (let i = 1; i < buffer.byteLength; i += 5) {
                              const index = view.getUint32(i);
                              const value = view.getUint8(i + 4) !== 0;
                              updates.push([index, value]);
                          }
                          handleBatchUpdate(updates);
                      }
                  });
              } else {
                  console.error('Received unexpected non-binary message');
              }
          };
      
          ws.onclose = (event) => {
              console.log('WebSocket connection closed', event.code, event.reason);
              if (!isDisconnecting) {
                  handleReconnection();
              }
          };
      
          ws.onerror = (error) => {
              console.error('WebSocket error:', error);
          };
      }
  
      function handleGracefulDisconnect() {
          isDisconnecting = true;
          console.log('Gracefully disconnecting...');
          // Perform any cleanup or UI updates here
          ws.close(1000, 'Graceful disconnect');
      }
  
      function gracefulDisconnect() {
          if (ws && ws.readyState === WebSocket.OPEN) {
              console.log('Sending graceful disconnect message to server');
              const disconnectMessage = new Uint8Array(1);
              disconnectMessage[0] = 253;
              ws.send(disconnectMessage.buffer);
          } else {
              console.log('WebSocket is not open, cannot send graceful disconnect message');
          }
      }

        function handleReconnection() {
          if (reconnectAttempts < maxReconnectAttempts) {
            reconnectAttempts++;
            console.log(\`Attempting to reconnect (\${reconnectAttempts}/\${maxReconnectAttempts}) in \${reconnectDelay}ms...\`);
            
            reconnectTimeoutId = setTimeout(() => {
              console.log(\`Reconnection attempt \${reconnectAttempts}\`);
              connect();
            }, reconnectDelay);
        
            // Implement exponential backoff with jitter
            const jitter = Math.random() * 1000; // Add up to 1 second of jitter
            reconnectDelay = Math.min((reconnectDelay * 2) + jitter, 60000); // Cap at 60 seconds
          } else {
            console.error('Max reconnection attempts reached. Please refresh the page.');
            // Optionally, you could implement a manual reconnect button here
            // displayManualReconnectOption();
          }
        }

        function checkConnectionStatus() {
          if (ws.readyState === WebSocket.CLOSED || ws.readyState === WebSocket.CLOSING) {
            console.log('WebSocket connection lost. Attempting to reconnect...');
            handleReconnection();
          }
        }

        function initWebSocket() {
          connect();
          // Check connection status every 10 seconds
          setInterval(checkConnectionStatus, 10000);
        }

        let processedChunks = new Set();

        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        function calculateBackgroundColor(redCount, blueCount) {
            const totalCount = redCount + blueCount;
            if (totalCount === 0) return 'rgb(128, 128, 128)'; // Dark gray when no checkboxes are selected

            const redPercentage = redCount / totalCount;
            const red = Math.round(200 * redPercentage);
            const blue = Math.round(200 * (1 - redPercentage));

            return \`rgb(\${red}, 0, \${blue})\`;
        }

        function updateBackgroundColor(count = checkedCount) {
            const redChecked = count;
            const blueChecked = totalCheckboxes - redChecked;
            const color = calculateBackgroundColor(redChecked, blueChecked);
            document.body.style.backgroundColor = color;
        }

        const debouncedUpdateBackgroundColor = debounce(updateBackgroundColor, 100);

        function updateCounter() {
            const uncheckedCount = totalCheckboxes - checkedCount;
            const redPercentage = (checkedCount / totalCheckboxes) * 100;
            const bluePercentage = 100 - redPercentage;

            redBar.style.width = redPercentage + '%';
            blueBar.style.width = bluePercentage + '%';

            redBar.textContent = checkedCount;
            blueBar.textContent = uncheckedCount;

            adjustFontSize(redBar, blueBar);
        }

        function adjustFontSize(redBar, blueBar) {
            const minFontSize = 10; // Minimum font size in pixels
            const maxFontSize = 24; // Maximum font size in pixels
            const counterBar = document.getElementById('counter-bar');
            const counterBarWidth = counterBar.offsetWidth;

            [redBar, blueBar].forEach(bar => {
                let fontSize = maxFontSize;
                bar.style.fontSize = \`\${fontSize}px\`;

                while (bar.scrollWidth > bar.offsetWidth && fontSize > minFontSize) {
                    fontSize--;
                    bar.style.fontSize = \`\${fontSize}px\`;
                }
            });
        }

        function scheduleCounterUpdate() {
            if (counterUpdateTimer === null) {
                counterUpdateTimer = setTimeout(() => {
                    updateCounter();
                    debouncedUpdateBackgroundColor(); // Use debounced version
                    counterUpdateTimer = null;
                }, batchInterval);
            }
        }

        function updateCheckbox(index, newState) {
            if (state[index] !== newState) {
                state[index] = newState;
                checkedCount += newState ? 1 : -1;
                scheduleCounterUpdate();
            }
            const checkbox = document.getElementById('checkbox-' + index);
            if (checkbox) {
                checkbox.checked = newState;
            }
        }

        function handleBatchUpdate(updates) {
          for (const [index, value] of updates) {
              updateCheckbox(index, value);
          }
        }

        let checkboxBaseWidth = 30;

        function updateCheckboxesPerRow() {
            const containerWidth = gridContainer.clientWidth;
            checkboxesPerRow = Math.floor(containerWidth / checkboxBaseWidth);
            const actualCheckboxWidth = containerWidth / checkboxesPerRow;
            document.documentElement.style.setProperty('--checkbox-width', \`\${actualCheckboxWidth}px\`);
            console.log(\`Checkboxes per row: \${checkboxesPerRow}\`);
        }

        function createCheckbox(index) {
            const wrapper = document.createElement('div');
            wrapper.className = 'checkbox-wrapper';
            wrapper.id = 'wrapper-' + index;
            wrapper.style.contain = 'layout size';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'checkbox';
            checkbox.id = 'checkbox-' + index;
            checkbox.checked = state[index];

            const checkmark = document.createElement('span');
            checkmark.className = 'checkmark';

            checkbox.addEventListener('change', () => {
                const newState = checkbox.checked;
                state[index] = newState;
                checkedCount += newState ? 1 : -1;
                scheduleCounterUpdate();
                addToBatchedUpdates(index, newState ? 1 : 0);
                updateBackgroundColor();
            });

            wrapper.appendChild(checkbox);
            wrapper.appendChild(checkmark);

            return wrapper;
        }

        function updateCheckboxPosition(wrapper, index) {
            const row = Math.floor(index / checkboxesPerRow);
            const col = index % checkboxesPerRow;
            const checkboxWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--checkbox-width'));
            wrapper.style.transform = \`translate(\${col * checkboxWidth}px, \${row * checkboxHeight}px)\`;
            wrapper.style.width = \`\${checkboxWidth + 0.5}px\`; // Add this line
        }

        function renderVisibleCheckboxes() {
            if (!stateInitialized) return;

            const viewportHeight = gridContainer.clientHeight;
            const currentScrollTop = gridContainer.scrollTop;
            
            const visibleRows = Math.ceil(viewportHeight / checkboxHeight);
            const totalBufferRows = bufferRows * 2;
            const renderedRows = visibleRows + totalBufferRows;

            const startRow = Math.max(0, Math.floor(currentScrollTop / checkboxHeight) - bufferRows);
            const endRow = Math.min(Math.ceil(totalCheckboxes / checkboxesPerRow), startRow + renderedRows);

            const startIndex = startRow * checkboxesPerRow;
            const endIndex = Math.min(endRow * checkboxesPerRow, totalCheckboxes);

            const fragment = document.createDocumentFragment();
            const newVisibleCheckboxes = new Map();

            for (let i = startIndex; i < endIndex; i++) {
                let checkbox = visibleCheckboxes.get(i);
                if (!checkbox) {
                    checkbox = createCheckbox(i);
                    fragment.appendChild(checkbox);
                }
                updateCheckboxPosition(checkbox, i);
                newVisibleCheckboxes.set(i, checkbox);
            }

            virtualScrollContainer.appendChild(fragment);

            visibleCheckboxes.forEach((checkbox, index) => {
                if (!newVisibleCheckboxes.has(index)) {
                    virtualScrollContainer.removeChild(checkbox);
                }
            });

            visibleCheckboxes = newVisibleCheckboxes;

            const totalRows = Math.ceil(totalCheckboxes / checkboxesPerRow);
            virtualScrollContainer.style.height = \`\${totalRows * checkboxHeight}px\`;
        }

        const debouncedRenderVisibleCheckboxes = debounce(renderVisibleCheckboxes, 16); // Adjust to 16ms (60fps)

        gridContainer.addEventListener('scroll', () => {
            requestAnimationFrame(debouncedRenderVisibleCheckboxes);
        }, { passive: true });

        const debouncedResize = debounce(() => {
            updateCheckboxesPerRow();
            renderVisibleCheckboxes();
        }, 250);

        window.addEventListener('resize', debouncedResize);
        
        function addToBatchedUpdates(index, state) {
          batchedUpdates.set(index, state);
          
          if (batchUpdateTimer === null) {
              batchUpdateTimer = setTimeout(sendBatchedUpdates, batchInterval);
          }
      }
    
        function sendBatchedUpdates() {
          if (ws.readyState === WebSocket.OPEN && batchedUpdates.size > 0) {
              const buffer = new ArrayBuffer(1 + batchedUpdates.size * 5);
              const view = new DataView(buffer);
              view.setUint8(0, batchedUpdates.size); // Number of updates in the batch
  
              let offset = 1;
              for (const [index, value] of batchedUpdates) {
                  view.setUint32(offset, index);
                  view.setUint8(offset + 4, value ? 1 : 0);
                  offset += 5;
              }
  
              ws.send(buffer);
              batchedUpdates.clear();
          }
          batchUpdateTimer = null;
      }

        // Add event listener for beforeunload event
        window.addEventListener('beforeunload', function (e) {
            gracefulDisconnect();
        });

        function handleInitChunk(chunkIndex, totalChunks, chunkData) {
            if (processedChunks.has(chunkIndex)) {
                console.log(\`Chunk \${chunkIndex + 1} already processed, skipping.\`);
                return;
            }
        
            let index = chunkIndex * 100000; // Assuming 100000 bits per chunk
            for (let i = 0; i < chunkData.length; i++) {
                for (let j = 0; j < 8; j++) {
                    if (index < totalCheckboxes) {
                        const newState = ((chunkData[i] >> (7 - j)) & 1) === 1;
                        state[index] = newState;
                        if (newState) realCheckedCount++;
                        index++;
                    }
                }
            }
        
            processedChunks.add(chunkIndex);
            console.log(\`Processed chunk: \${chunkIndex + 1} of \${totalChunks}\`);
        
            if (processedChunks.size === totalChunks) {
                console.log('All chunks received and processed. Initializing UI...');
                clearTimeout(initializationTimer);
                stateInitialized = true;
                checkedCount = realCheckedCount; // Update checkedCount with the real value
                scheduleCounterUpdate();
                renderVisibleCheckboxes();
            }
            
            // Gradually transition the background color
            const progress = processedChunks.size / totalChunks;
            const transitionCheckedCount = Math.round(checkedCount * (1 - progress) + realCheckedCount * progress);
            debouncedUpdateBackgroundColor(transitionCheckedCount);
        }

        function initializeState() {
          console.log('Initializing state...');
          const initMessage = new Uint8Array(1);
          initMessage[0] = 255;
          ws.send(initMessage.buffer);
          initializationTimer = setTimeout(() => {
              console.log('Initialization timed out.');
              stateInitialized = true;
              renderVisibleCheckboxes();
          }, initializationTimeout);
          
          // Reset realCheckedCount before initialization
          realCheckedCount = 0;
          stateInitialized = false;
          
          // Initial update of background color
          debouncedUpdateBackgroundColor(checkedCount);
      }

        // Add this function to set the initial background color
        function setInitialBackgroundColor() {
            updateBackgroundColor(Math.floor(totalCheckboxes / 2)); // Start with half checked
        }

        initWebSocket();
        scheduleCounterUpdate(); // Initial counter update
        setInitialBackgroundColor(); // Set the initial background color

        // Update the background color every batch interval
        setInterval(debouncedUpdateBackgroundColor, batchInterval);

        // Initial setup
        updateCheckboxesPerRow();
        renderVisibleCheckboxes();
        adjustFontSize(redBar, blueBar);

        // Add resize event listener to readjust font size when window is resized
        window.addEventListener('resize', () => {
            adjustFontSize(redBar, blueBar);
        });

        function handleJumpToCheckbox() {
            const number = parseInt(document.getElementById('jumpToNumber').value, 10);
            if (number >= 0 && number < totalCheckboxes) {
                scrollToCheckbox(number);
            } else {
                alert(\`Please enter a number between 0 and \${totalCheckboxes - 1}\`);
            }
        }

        function scrollToCheckbox(index) {
            const row = Math.floor(index / checkboxesPerRow);
            const col = index % checkboxesPerRow;
            
            const checkboxTop = row * checkboxHeight;
            const checkboxLeft = col * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--checkbox-width'));
            
            const viewportHeight = gridContainer.clientHeight;
            const viewportWidth = gridContainer.clientWidth;
            
            const targetScrollTop = Math.max(0, checkboxTop - (viewportHeight / 2) + (checkboxHeight / 2));
            const targetScrollLeft = Math.max(0, checkboxLeft - (viewportWidth / 2) + (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--checkbox-width')) / 2));
            
            gridContainer.scrollTo({
                top: targetScrollTop,
                left: targetScrollLeft,
                behavior: 'smooth'
            });

            let lastScrollTop = gridContainer.scrollTop;
            let lastScrollLeft = gridContainer.scrollLeft;
            let scrollEndCounter = 0;

            function checkScrollEnd() {
                if (Math.abs(gridContainer.scrollTop - targetScrollTop) < 1 &&
                    Math.abs(gridContainer.scrollLeft - targetScrollLeft) < 1) {
                    scrollEndCounter++;
                    if (scrollEndCounter >= 10) {  // Wait for 10 frames of stability
                        setTimeout(() => {
                            renderVisibleCheckboxes();
                            highlightCheckbox(index);
                        }, 100);  // Additional delay to ensure rendering is complete
                    } else {
                        requestAnimationFrame(checkScrollEnd);
                    }
                } else {
                    scrollEndCounter = 0;
                    lastScrollTop = gridContainer.scrollTop;
                    lastScrollLeft = gridContainer.scrollLeft;
                    requestAnimationFrame(checkScrollEnd);
                }
            }

            requestAnimationFrame(checkScrollEnd);
        }

        function highlightCheckbox(index) {
            const checkbox = document.getElementById('checkbox-' + index);
            if (checkbox) {
                const rect = checkbox.getBoundingClientRect();
                const overlay = document.createElement('div');
                overlay.style.position = 'fixed';
                overlay.style.top = \`\${rect.top}px\`;
                overlay.style.left = \`\${rect.left}px\`;
                overlay.style.width = \`\${rect.width}px\`;
                overlay.style.height = \`\${rect.height}px\`;
                overlay.style.boxShadow = '0 0 10px 5px yellow';
                overlay.style.backgroundColor = 'rgba(255, 255, 0, 0.5)';
                overlay.style.pointerEvents = 'none';
                overlay.style.zIndex = '10000';
                overlay.style.transition = 'opacity 0.5s, transform 0.5s';
                overlay.style.opacity = '0';
                overlay.style.transform = 'scale(1.5)';
                
                document.body.appendChild(overlay);
                
                requestAnimationFrame(() => {
                    overlay.style.opacity = '1';
                    overlay.style.transform = 'scale(1)';
                    
                    setTimeout(() => {
                        overlay.style.opacity = '0';
                        overlay.style.transform = 'scale(1.5)';
                        setTimeout(() => {
                            document.body.removeChild(overlay);
                        }, 300);
                    }, 1000);
                });
            }
        }

        // Add these lines inside the DOMContentLoaded event listener
        document.getElementById('jumpToNumber').addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                handleJumpToCheckbox();
            }
        });

        // Add this line to make handleJumpToCheckbox globally accessible
        window.handleJumpToCheckbox = handleJumpToCheckbox;

        // Add event listener for the "Go" button
        document.getElementById('jumpButton').addEventListener('click', handleJumpToCheckbox);
    });
    </script>
</body>
</html>
`;

export function serveMainPage() {
  return new Response(mainPageHTML, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}