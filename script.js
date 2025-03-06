document.addEventListener('DOMContentLoaded', function() {
    const menuContainer = document.getElementById('menu');
    const menuForm = document.getElementById('menuForm');
    let menuData = [];
  
    // Función para renderizar el menú
    function renderMenu() {
      menuContainer.innerHTML = '';
      const menu = document.createElement('ul');
      menuData.forEach(item => {
        const menuItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = item.enlace;
        link.textContent = item.nombre;
        menuItem.appendChild(link);
  
        // Verificar si hay submenús
        if (item.submenus) {
          const submenu = document.createElement('ul');
          item.submenus.forEach(subitem => {
            const submenuItem = document.createElement('li');
            const sublink = document.createElement('a');
            sublink.href = subitem.enlace;
            sublink.textContent = subitem.nombre;
            submenuItem.appendChild(sublink);
            submenu.appendChild(submenuItem);
          });
          menuItem.appendChild(submenu);
        }
  
        menu.appendChild(menuItem);
      });
      menuContainer.appendChild(menu);
    }
  
    // Cargar el JSON y renderizar el menú
    fetch('menu.json')
      .then(response => response.json())
      .then(data => {
        menuData = data.menu;
        renderMenu();
      })
      .catch(error => console.error('Error al cargar el menú:', error));
  
    // Agregar nueva opción al menú
    menuForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const nombre = document.getElementById('nombre').value.trim();
      const enlace = document.getElementById('enlace').value.trim();
  
      if (nombre && enlace) {
        // Validar que el enlace sea válido
        try {
          new URL(enlace);
        } catch (_) {
          alert('Por favor, ingrese un enlace válido.');
          return;
        }
  
        // Generar un ID único
        const id = menuData.length ? Math.max(...menuData.map(item => item.id)) + 1 : 1;
  
        // Agregar la nueva opción al menú
        menuData.push({ id, nombre, enlace });
        renderMenu();
  
        // Limpiar el formulario
        menuForm.reset();
      } else {
        alert('Por favor, complete todos los campos.');
      }
    });
  });
  