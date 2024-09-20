/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Form = ({ showModal, setShowModal, fontSize, editedJob, setJobList }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    industry: '',
    location: '',
    remoteType: '',
    minExperience: '',
    maxExperience: '',
    minSalary: '',
    maxSalary: '',
    totalEmployees: '',
    apply_type: '',
  });
  const [step1Errors, setStep1Errors] = useState({});
  const [step2Errors, setStep2Errors] = useState({});

//   w

  const validateStep1 = () => {
    const errors = {};

    if (!formData.jobTitle.trim()) {
      errors.jobTitle = 'Job Title is required';
    }

    if (!formData.companyName.trim()) {
      errors.companyName = 'Company Name is required';
    }

    if (!formData.industry.trim()) {
      errors.industry = 'Industry is required';
    }

    if (!formData.location.trim()) {
      errors.location = 'Location is required';
    }

    if (!formData.remoteType.trim()) {
      errors.remoteType = 'Type  is required';
    }

    setStep1Errors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors = {};

    if (!formData.minExperience.trim()) {
      errors.minExperience = 'Minimum Experience is required';
    }

    if (!formData.maxExperience.trim()) {
      errors.maxExperience = 'Maximum Experience is required';
    }

    if (!formData.minSalary.trim()) {
      errors.minSalary = 'Minimum Salary is required';
    }

    if (!formData.maxSalary.trim()) {
      errors.maxSalary = 'Maximum Salary is required';
    }

    if (!formData.totalEmployees.trim()) {
      errors.totalEmployees = 'Total Employees is required';
    }

    if (!formData.apply_type.trim()) {
      errors.apply_type = 'Apply Type is required';
    }

    setStep2Errors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = async () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      const res = await axios.post('https://6555b88984b36e3a431e30d7.mockapi.io/api/job', formData);
      if (res.status === 201) {
        console.log('Form submitted');
        setFormData({
          companyName: '',
          industry: '',
          jobTitle: '',
          location: '',
          remoteType: '',
          minExperience: '',
          maxExperience: '',
          minSalary: '',
          maxSalary: '',
          totalEmployees: '',
          apply_type: '',
        });
        setStep(1);
        setShowModal(false);
        const updatedJobList = await getUpdatedJobList();
        setJobList(updatedJobList);
      }
    }
  };

  const handleUpdate = async () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      const res = await axios.put(
        `https://6555b88984b36e3a431e30d7.mockapi.io/api/job/${editedJob.id}`,
        formData
      );
      setJobList((prevJobList) =>
        prevJobList.map((job) => (job.id === editedJob.id ? { ...job, ...formData } : job))
      );
      if (res.status === 200) {
        console.log('Form Updated');
        setFormData({
          companyName: '',
          industry: '',
          jobTitle: '',
          location: '',
          remoteType: '',
          minExperience: '',
          maxExperience: '',
          minSalary: '',
          maxSalary: '',
          totalEmployees: '',
          apply_type: '',
        });
        setStep(1);
        setShowModal(false);
        const updatedJobList = await getUpdatedJobList();
        setJobList(updatedJobList);
      }
    }
  };

  const getUpdatedJobList = async () => {
    const res = await axios.get('https://6555b88984b36e3a431e30d7.mockapi.io/api/job');
    return res.data;
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    if (step === 1) {
      setStep1Errors({
        ...step1Errors,
        [field]: '',
      });
    } else if (step === 2) {
      setStep2Errors({
        ...step2Errors,
        [field]: '',
      });
    }
  };

  const Questions = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <Text style={{ fontWeight: 'bold', fontSize: fontSize.heading }}>Create a Job</Text>
              <Text style={{ fontWeight: 'bold', fontSize: fontSize.heading }}>Step 1</Text>
            </View>
          </View>
        );
      case 2:
        return (
          <View>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
              <Text style={{ fontWeight: 'bold', fontSize: fontSize.heading }}>Create a Job</Text>
              <Text style={{ fontWeight: 'bold', fontSize: fontSize.heading }}>Step 2</Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View>
      {showModal && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{backgroundColor: 'white', padding: 8, borderRadius: 8 }}>
            <View style={{ flex: 1, justifyContent: 'space-between', gap: 24 }}>
              {Questions()}
              {step === 1 ? (
                <View style={{ width: '100%', justifyContent: 'flex-end' }}>
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 4,
                      paddingVertical: 2,
                      backgroundColor: '#1597E4',
                      borderRadius: 4,
                    }}
                    onPress={() => handleNext()}
                  >
                    <Text style={{ color: 'white' }}>Next</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{ width: '100%', justifyContent: 'flex-end' }}>
                  {editedJob ? (
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 4,
                        paddingVertical: 2,
                        backgroundColor: '#1597E4',
                        borderRadius: 4,
                      }}
                      onPress={() => handleUpdate()}
                    >
                      <Text style={{ color: 'white' }}>Update</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 4,
                        paddingVertical: 2,
                        backgroundColor: '#1597E4',
                        borderRadius: 4,
                      }}
                      onPress={() => handleNext()}
                    >
                      <Text style={{ color: 'white' }}>Save</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Form;
