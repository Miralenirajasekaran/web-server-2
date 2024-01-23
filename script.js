let bluetoothDevice;
let characteristic;

document.getElementById('connectButton').addEventListener('click', async () => {
  try {
    bluetoothDevice = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: ['battery_service'] // Replace with the actual service UUID of your device
    });

    const server = await bluetoothDevice.gatt.connect();
    const service = await server.getPrimaryService('battery_service'); // Replace with the actual service UUID of your device
    characteristic = await service.getCharacteristic('battery_level'); // Replace with the actual characteristic UUID of your device

    console.log('Connected to Bluetooth device');
  } catch (error) {
    console.error('Error connecting to Bluetooth device:', error);
  }
});

document.getElementById('onButton').addEventListener('click', async () => {
  if (characteristic) {
    await characteristic.writeValue(new Uint8Array([1])); // Send command to turn on
    console.log('Turned On');
  } else {
    console.error('Not connected to Bluetooth device');
  }
});

document.getElementById('offButton').addEventListener('click', async () => {
  if (characteristic) {
    await characteristic.writeValue(new Uint8Array([0])); // Send command to turn off
    console.log('Turned Off');
  } else {
    console.error('Not connected to Bluetooth device');
  }
});

document.getElementById('speedSlider').addEventListener('input', async (event) => {
  const speedValue = event.target.value;
  if (characteristic) {
    // Convert the speed value to a Uint8Array and send it to the device
    const speedArray = new Uint8Array([speedValue]);
    await characteristic.writeValue(speedArray);
    console.log('Speed adjusted:', speedValue);
  } else {
    console.error('Not connected to Bluetooth device');
  }
});