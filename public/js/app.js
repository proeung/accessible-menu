const accessibleMenu = function (domNode) {
    this.rootNode = domNode;
    this.triggerNodes = [];
    this.controlledNodes = [];
    this.openIndex = null;
    this.useArrowKeys = true;
  };
  
  accessibleMenu.prototype.init = function () {
    const buttons = this.rootNode.querySelectorAll('button[aria-expanded][aria-controls]');
    for (var i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      const menu = button.parentNode.querySelector('.accessible-menu__sub-menu');
      if (menu) {
        // Save ref to button and controlled menu.
        this.triggerNodes.push(button);
        this.controlledNodes.push(menu);
  
        // Collapse menus.
        button.setAttribute('aria-expanded', 'false');
        this.toggleMenu(menu, false);
  
        // Attach event listeners.
        menu.addEventListener('keydown', this.handleMenuKeyDown.bind(this));
        button.addEventListener('click', this.handleButtonClick.bind(this));
        button.addEventListener('keydown', this.handleButtonKeyDown.bind(this));
      }
    }

    this.rootNode.addEventListener('focusout', this.handleBlur.bind(this));

    // Show the menu help instructions when the first button is focused.
    const menuHelp = document.querySelector('.menu-help-instructions');
    if (buttons[0].getAttribute('aria-expanded') === 'false') {
      buttons[0].addEventListener('focusin', () => {

        window.setTimeout(() => {
          menuHelp.classList.remove('sr-only');
        }, 200);
      });
  
      buttons[0].addEventListener('focusout', () => {
        menuHelp.classList.add('sr-only');
      });
    }
  };
  
  accessibleMenu.prototype.toggleMenu = function (domNode, show) {
    if (domNode) {
      domNode.style.display = show ? 'grid' : 'none';
      domNode.style.visibility = show ? 'visible' : 'hidden';
      domNode.classList.toggle('menu-is-open', show);
    }
  };
  
  accessibleMenu.prototype.toggleExpand = function (index, expanded) {
    // Close open menu, if applicable.
    if (this.openIndex !== index) {
      this.toggleExpand(this.openIndex, false);
    }
  
    // Handle menu at called index.
    if (this.triggerNodes[index]) {
      this.openIndex = expanded ? index : null;
      this.triggerNodes[index].setAttribute('aria-expanded', expanded);
      this.toggleMenu(this.controlledNodes[index], expanded);
    }
  };
  
  accessibleMenu.prototype.controlFocusByKey = function (keyboardEvent, nodeList, currentIndex) {
    switch (keyboardEvent.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        keyboardEvent.preventDefault();
        if (currentIndex > -1) {
          const prevIndex = Math.max(0, currentIndex - 1);
          nodeList[prevIndex].focus();
        }
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        keyboardEvent.preventDefault();
        if (currentIndex > -1) {
          const nextIndex = Math.min(nodeList.length - 1, currentIndex + 1);
          nodeList[nextIndex].focus();
        }
        break;
      case 'Home':
        keyboardEvent.preventDefault();
        nodeList[0].focus();
        break;
      case 'End':
        keyboardEvent.preventDefault();
        nodeList[nodeList.length - 1].focus();
        break;
    }
  };
  
  /* Event Handlers */
  accessibleMenu.prototype.handleBlur = function (event) {
    const menuContainsFocus = this.rootNode.contains(event.relatedTarget);
    if (!menuContainsFocus && this.openIndex !== null) {
      this.toggleExpand(this.openIndex, false);
    }
  };
  
  accessibleMenu.prototype.handleButtonKeyDown = function (event) {
    const targetButtonIndex = this.triggerNodes.indexOf(document.activeElement);
  
    // Close the menu on the escape key.
    if (event.key === 'Escape') {
      this.toggleExpand(this.openIndex, false);
    }
  
    // Move focus into the open menu if the current menu is open.
    else if (this.useArrowKeys && this.openIndex === targetButtonIndex && event.key === 'ArrowDown') {
      event.preventDefault();
      this.controlledNodes[this.openIndex].querySelector('a').focus();
    }
  
    // Handle arrow key navigation between top-level buttons, if set.
    else if (this.useArrowKeys) {
      this.controlFocusByKey(event, this.triggerNodes, targetButtonIndex);
    }
  };
  
  accessibleMenu.prototype.handleButtonClick = function (event) {
    const button = event.target;
    const buttonIndex = this.triggerNodes.indexOf(button);
    const buttonExpanded = button.getAttribute('aria-expanded') === 'true';
    this.toggleExpand(buttonIndex, !buttonExpanded);
  };
  
  accessibleMenu.prototype.handleMenuKeyDown = function (event) {
    if (this.openIndex === null) {
      return;
    }
  
    const menuLinks = Array.prototype.slice.call(this.controlledNodes[this.openIndex].querySelectorAll('a'));
    const currentIndex = menuLinks.indexOf(document.activeElement);
  
    // Close the menu on the escape key.
    if (event.key === 'Escape') {
      this.triggerNodes[this.openIndex].focus();
      this.toggleExpand(this.openIndex, false);
    }
  
    // Handle arrow key navigation within menu links, if set.
    else if (this.useArrowKeys) {
      this.controlFocusByKey(event, menuLinks, currentIndex);
    }
  };
  
  // Switch on/off arrow key navigation.
  accessibleMenu.prototype.updateKeyControls = function (useArrowKeys) {
    this.useArrowKeys = useArrowKeys;
  };
  
  // Initialize Menus.
  window.addEventListener('load', function (event) {
    const menus = document.querySelectorAll('.accessible-menu');
    const accessibleMenus = [];
  
    for (var i = 0; i < menus.length; i++) {
      accessibleMenus[i] = new accessibleMenu(menus[i]);
      accessibleMenus[i].init();
    }

    // Toggle Hamburger Button & Dropdown.
    const hamburgerButton = document.querySelector('.hamburger-button');
    hamburgerButton.addEventListener('click', function(menu) {
      hamburgerButton.classList.toggle('active');

      if (hamburgerButton.getAttribute('aria-expanded') === 'false') {
        // Set aria attribute.
        this.setAttribute("aria-expanded", 'true');
        //Apply toggle class to the first menu from arry.
        menus[0].classList.add('menu-is-open');
      } else {
        this.setAttribute("aria-expanded", 'false');
        menus[0].classList.remove('menu-is-open');
      }
    });
  
  }, false);
