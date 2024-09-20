import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import axios from 'axios';

const Form = ({
  showModal,
  setShowModal,
  // width,
  // height,
  fontSize,
  editedJob,
  setJobList,
}) => {
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

  useEffect(() => {
    if (editedJob !== null) {
      setFormData({
        jobTitle: editedJob.jobTitle || '',
        companyName: editedJob.companyName || '',
        industry: editedJob.industry || '',
        location: editedJob.location || '',
        remoteType: editedJob.remoteType || '',
        minExperience: String(editedJob.minExperience) || '',
        maxExperience: String(editedJob.maxExperience) || '',
        minSalary: String(editedJob.minSalary) || '',
        maxSalary: String(editedJob.maxSalary) || '',
        totalEmployees: String(editedJob.totalEmployees) || '',
        apply_type: editedJob.apply_type || '',
      });
    } else {
      setFormData({
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
    }
  }, [editedJob]);

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
      try {
        const res = await axios.post(
          'https://6555b88984b36e3a431e30d7.mockapi.io/api/job',
          formData
        );
        if (res.status === 201) {
          console.log('Form submitted');
          resetForm();
          setStep(1);
          setShowModal(false);
          const updatedJobList = await getUpdatedJobList();
          setJobList(updatedJobList);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle error appropriately, e.g., show an alert
        Alert.alert('Error', 'Failed to submit form. Please try again.');
      }
    }
  };

  const handleUpdate = async () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      try {
        const res = await axios.put(
          `https://6555b88984b36e3a431e30d7.mockapi.io/api/job/${editedJob.id}`,
          formData
        );
        setJobList((prevJobList) =>
          prevJobList.map((job) =>
            job.id === editedJob.id ? { ...job, ...formData } : job
          )
        );
        if (res.status === 200) {
          console.log('Form Updated');
          resetForm();
          setStep(1);
          setShowModal(false);
          const updatedJobList = await getUpdatedJobList();
          setJobList(updatedJobList);
        }
      } catch (error) {
        console.error('Error updating form:', error);
        // Handle error appropriately, e.g., show an alert
        Alert.alert('Error', 'Failed to update form. Please try again.');
      }
    }
  };

  const getUpdatedJobList = async () => {
    try {
      const res = await axios.get(
        'https://6555b88984b36e3a431e30d7.mockapi.io/api/job'
      );
      return res.data;
    } catch (error) {
      console.error('Error fetching job list:', error);
      // Handle error appropriately, e.g., show an alert
      Alert.alert('Error', 'Failed to fetch job list. Please try again.');
      return [];
    }
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

  const resetForm = () => {
    setFormData({
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
  };

  const renderQuestions = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold', fontSize: fontSize.heading }}>
                Create a Job
              </Text>
              <Text style={{ fontWeight: 'bold', fontSize: fontSize.heading }}>Step 1</Text>
            </View>
          </View>
        );
      case 2:
        return (
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold', fontSize: fontSize.heading }}>
                Create a Job
              </Text>
              <Text style={{ fontWeight: 'bold', fontSize: fontSize.heading }}>Step 2</Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {showModal && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            padding: 10,
          }}
        >
          <View
            style={{
              // width,
              // height,
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 20,
            }}
          >
            {renderQuestions()}
            {step === 1 ? (
              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor: '#1597E4',
                    borderRadius: 5,
                    alignItems: 'center',
                  }}
                  onPress={handleNext}
                >
                  <Text style={{ color: 'white' }}>Next</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                {editedJob ? (
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      backgroundColor: '#1597E4',
                      borderRadius: 5,
                      alignItems: 'center',
                    }}
                    onPress={handleUpdate}
                  >
                    <Text style={{ color: 'white' }}>Update</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      backgroundColor: '#1597E4',
                      borderRadius: 5,
                      alignItems: 'center',
                    }}
                    onPress={handleNext}
                  >
                    <Text style={{ color: 'white' }}>Save</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default Form;
