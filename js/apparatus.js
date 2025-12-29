function renderApparatus() {
  const machines = (apparatus && apparatus.records) || [];
  const slider = document.querySelector('.apparatus__test');
  machines.forEach(machine => {
    const machineEl = document.querySelector('#gearsTemp').cloneNode();
    console.log('apparatus => machine', machine);
    machineEl.innerHtml = machine.Fields.Name;
    slider.appendChild(machineEl);
  })
}