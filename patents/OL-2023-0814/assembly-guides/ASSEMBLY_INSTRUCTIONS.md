# Assembly Instructions - OL-2023-0814

**Acousto-Resonant Biometric Attuner (ARBA)**

**Difficulty Level**: Intermediate  
**Estimated Time**: 40-60 hours  
**Required Expertise**: Electronics, PCB assembly, acoustic engineering

---

## Table of Contents

1. [Tools & Equipment Required](#tools--equipment-required)
2. [Component Preparation](#component-preparation)
3. [Assembly Sequence](#assembly-sequence)
4. [Calibration Procedures](#calibration-procedures)
5. [Testing & Validation](#testing--validation)
6. [Troubleshooting](#troubleshooting)

---

## Tools & Equipment Required

### Essential Tools

- Soldering iron (40-60W)
- Solder (lead-free, 60/40 or 63/37)
- Desoldering pump or solder wick
- Multimeter (digital)
- Oscilloscope (for frequency verification)
- Frequency counter
- Sound level meter
- Calipers (digital)
- Drill press or hand drill
- Cutting tools (hacksaw, file)
- Screwdrivers (Phillips and flathead)
- Tweezers and needle-nose pliers
- Heat gun or heat shrink tubing

### Safety Equipment

- Safety glasses
- Soldering fume extractor
- Heat-resistant gloves
- First aid kit
- Fire extinguisher

### Measurement Equipment

- Multimeter
- Oscilloscope (recommended)
- Frequency counter
- Sound level meter
- Thermometer

---

## Component Preparation

### Step 1: Verify All Components

Before assembly, verify that all components match the Bill of Materials:

1. Check component count against BOM
2. Verify component specifications (voltage, frequency, tolerance)
3. Test all electronic components with multimeter
4. Inspect mechanical components for damage

### Step 2: Prepare Piezoelectric Transducers

1. Clean piezo elements with isopropyl alcohol
2. Inspect for cracks or damage
3. Measure resonant frequency with frequency counter
4. Record baseline measurements in log

### Step 3: Prepare Copper/Brass Housing

1. Cut copper tubing to specified dimensions (280mm length, 65mm diameter)
2. File edges smooth
3. Drill mounting holes for transducers (12 holes, evenly spaced)
4. Drill biometric sensor pad mounting holes
5. Create resonance chamber interior (see technical drawings)
6. Anodize or polish exterior finish

### Step 4: Prepare PCB Assembly

1. Solder microcontroller to PCB
2. Solder all resistors, capacitors, and inductors
3. Solder operational amplifiers
4. Install voltage regulators
5. Solder connectors (USB-C, biometric sensor pads)
6. Test all solder joints with multimeter

---

## Assembly Sequence

### Phase 1: Transducer Array Assembly (Hours 1-8)

**Objective**: Mount and wire all 12 piezoelectric transducers

**Procedure**:

1. **Mount transducers in housing**
   - Insert piezo elements into mounting holes
   - Secure with epoxy adhesive
   - Allow 24 hours for cure

2. **Wire transducers in parallel**
   - Connect positive terminals together
   - Connect negative terminals together
   - Use 22 AWG copper wire
   - Solder connections securely

3. **Install focusing lenses**
   - Mount polycarbonate lenses on transducer tips
   - Align with transducer axes
   - Secure with retaining rings

4. **Test transducer array**
   - Apply 24V DC to array
   - Measure output frequency with oscilloscope
   - Verify all 12 elements responding

### Phase 2: Biometric Sensor Integration (Hours 9-16)

**Objective**: Install and calibrate biometric sensors

**Procedure**:

1. **Install fingerprint scanner**
   - Mount optical/capacitive sensor on biometric pad
   - Connect to microcontroller via I2C
   - Calibrate sensor with reference fingerprints
   - Test recognition accuracy (target: >99%)

2. **Install heart rate sensor (PPG)**
   - Mount LED and photodiode on sensor pad
   - Connect to microcontroller ADC
   - Calibrate with reference heart rate data
   - Test accuracy (target: ±2 BPM)

3. **Install skin conductance sensor**
   - Mount silver/silver chloride electrodes
   - Connect to microcontroller ADC
   - Calibrate baseline conductance
   - Test response time (<500ms)

4. **Install temperature sensor**
   - Mount thermistor on sensor pad
   - Connect to microcontroller ADC
   - Calibrate with reference temperatures
   - Test accuracy (target: ±0.5°C)

### Phase 3: Frequency Generator Assembly (Hours 17-28)

**Objective**: Build and calibrate frequency generation system

**Procedure**:

1. **Assemble variable oscillator**
   - Build oscillator circuit on PCB
   - Install tuning potentiometer
   - Connect to microcontroller DAC
   - Test frequency range (20 Hz - 20 kHz)

2. **Install harmonic amplifier**
   - Mount operational amplifiers
   - Install power supply filtering
   - Connect to transducer array
   - Test amplification (target: <2% THD)

3. **Program microcontroller**
   - Load firmware with frequency algorithm
   - Program biometric-to-frequency conversion
   - Install harmonic series generation
   - Test real-time frequency adaptation

4. **Calibrate frequency accuracy**
   - Use frequency counter for verification
   - Adjust oscillator for ±0.7 Hz accuracy
   - Test across full frequency range
   - Log calibration data

### Phase 4: Power System Assembly (Hours 29-36)

**Objective**: Install and test battery and power management

**Procedure**:

1. **Install battery pack**
   - Mount Li-ion cells in series/parallel configuration
   - Install battery management system (BMS)
   - Connect to main power bus
   - Test voltage output (target: 24V nominal)

2. **Install voltage regulators**
   - Mount 5V regulator for microcontroller
   - Mount 12V regulator for biometric sensors
   - Mount 24V regulator for transducers
   - Test output voltages under load

3. **Install power protection**
   - Add fuses for each circuit
   - Install thermal shutdown circuit
   - Add overvoltage protection
   - Test protection circuits

4. **Test power system**
   - Verify all voltages
   - Test current draw (target: <25A max)
   - Test battery life (target: 6-8 hours continuous)
   - Test charging system

### Phase 5: Integration & Testing (Hours 37-48)

**Objective**: Integrate all systems and perform comprehensive testing

**Procedure**:

1. **Connect all subsystems**
   - Connect transducer array to amplifier
   - Connect biometric sensors to microcontroller
   - Connect frequency generator to transducers
   - Connect power system to all circuits

2. **Perform system integration test**
   - Power on device
   - Test biometric capture
   - Test frequency generation
   - Test acoustic output
   - Test all modes (Meditative, Defensive, Experimentation)

3. **Calibrate complete system**
   - Establish baseline biometric values
   - Calibrate frequency-to-biometric mapping
   - Test frequency accuracy across range
   - Test acoustic output levels

4. **Final validation**
   - Run full test protocol (see TESTING_PROTOCOLS.md)
   - Verify all specifications met
   - Document test results
   - Perform safety checks

---

## Calibration Procedures

### Frequency Calibration

**Equipment**: Frequency counter, reference signal generator

**Procedure**:

1. Generate reference frequency (1 kHz)
2. Measure device output with frequency counter
3. Adjust oscillator potentiometer for accuracy
4. Repeat across full frequency range (20 Hz - 20 kHz)
5. Target accuracy: ±0.7 Hz

### Biometric Calibration

**Equipment**: Reference fingerprints, pulse oximeter, skin conductance reference

**Procedure**:

1. **Fingerprint calibration**
   - Scan 10 reference fingerprints
   - Verify recognition accuracy >99%
   - Store templates for future comparison

2. **Heart rate calibration**
   - Measure with reference pulse oximeter
   - Compare device measurement
   - Adjust calibration factor
   - Target accuracy: ±2 BPM

3. **Skin conductance calibration**
   - Establish baseline conductance
   - Test with reference conductance meter
   - Adjust calibration factor
   - Target accuracy: ±0.1 µS

4. **Temperature calibration**
   - Measure with reference thermometer
   - Compare device measurement
   - Adjust calibration factor
   - Target accuracy: ±0.5°C

### Acoustic Output Calibration

**Equipment**: Sound level meter, reference microphone

**Procedure**:

1. Set device to known frequency (1 kHz)
2. Measure SPL at 1 meter with sound level meter
3. Adjust output power for target level
4. Repeat across frequency range
5. Target: Flat response ±3 dB

---

## Testing & Validation

### Functional Testing

- [ ] Biometric sensors capture data
- [ ] Frequency generation works across range
- [ ] Acoustic output audible
- [ ] All modes functional
- [ ] Battery charges and discharges
- [ ] All controls responsive

### Performance Testing

- [ ] Frequency accuracy: ±0.7 Hz
- [ ] Biometric accuracy: Within specifications
- [ ] Acoustic output: 85-140 dB SPL
- [ ] Battery life: 6-8 hours
- [ ] Response time: <500ms

### Safety Testing

- [ ] No electrical hazards
- [ ] Thermal management working
- [ ] Acoustic output within safe limits
- [ ] Biometric data encrypted
- [ ] Emergency shutdown functional

---

## Troubleshooting

### No Power

**Symptom**: Device won't turn on

**Diagnosis**:
1. Check battery voltage (should be 24V)
2. Check power switch continuity
3. Check fuses

**Solution**:
- Replace battery if voltage low
- Replace power switch if open
- Replace blown fuses

### No Frequency Output

**Symptom**: No sound from transducers

**Diagnosis**:
1. Check transducer connections
2. Check amplifier output voltage
3. Check frequency generator circuit

**Solution**:
- Resolder transducer connections
- Check amplifier power supply
- Reprogram microcontroller

### Frequency Inaccuracy

**Symptom**: Frequency off by >1 Hz

**Diagnosis**:
1. Check oscillator calibration
2. Check reference signal
3. Check frequency counter

**Solution**:
- Recalibrate oscillator
- Verify reference signal
- Verify frequency counter accuracy

### Biometric Sensor Failure

**Symptom**: Sensors not reading

**Diagnosis**:
1. Check sensor connections
2. Check microcontroller ADC
3. Check sensor power supply

**Solution**:
- Resolder sensor connections
- Test ADC with multimeter
- Check voltage regulator

---

## Document Information

**Version**: 1.0  
**Date**: August 14, 2023  
**Last Updated**: May 2, 2026  
**Status**: Active

---

*For questions about assembly, please open an issue in the repository.*
