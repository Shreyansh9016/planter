let currentStage = 0; // Track the current growth stage

// Load tree data
fetch('data/trees.json')
  .then(response => response.json())
  .then(trees => {
      const treeSelector = document.getElementById('treeSelector');
      
      // Populate the dropdown with tree options
      trees.forEach(tree => {
          const option = document.createElement('option');
          option.value = tree.name;
          option.textContent = tree.name;
          treeSelector.appendChild(option);
      });

      // Place tree in AR when "Place Tree" is clicked
      document.getElementById('placeTree').addEventListener('click', () => {
          const selectedTree = treeSelector.value;
          const tree = trees.find(t => t.name === selectedTree);
          const treeModel = document.getElementById('treeModel');
          
          // Reset growth stage when placing a new tree
          currentStage = 0;
          
          // Load the selected tree's model and set the initial scale
          treeModel.setAttribute('gltf-model', `models/${tree.name.toLowerCase()}.gltf`);
          treeModel.setAttribute('scale', tree.growthStages[currentStage].scale); // Start small
      });

      // Simulate tree growth when "Grow Tree" is clicked
      document.getElementById('growTree').addEventListener('click', () => {
          const treeModel = document.getElementById('treeModel');
          const selectedTree = treeSelector.value;
          const tree = trees.find(t => t.name === selectedTree);

          // Check if there's another growth stage to display
          if (currentStage < tree.growthStages.length - 1) {
              currentStage++;
              treeModel.setAttribute('scale', tree.growthStages[currentStage].scale);
          } else {
              alert("The tree has reached its maximum growth!");
          }
      });
  });
