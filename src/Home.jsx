/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Form from './Form';
import axios from 'axios';
import Jobs from './Job';

const App = () => {
  const [modal, setModal] = useState(false);
  // const width = 577;
  // const height = 564;
  const fontSize = { card: 20, heading: 20, side_heading: 14 };
  const cardWidth = 830;
  const cardHeight = 320;
  const cardWeight = 500;
  const buttonWidth = 118;

  const [jobList, setJobList] = useState([]);
  const [editedJob, setEditedJob] = useState(null);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleEdit = (id) => {
    const jobToEdit = jobList.find((job) => job.id === id);
    setEditedJob(jobToEdit);
    setModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`https://6555b88984b36e3a431e30d7.mockapi.io/api/job/${id}`);
      if (res.status === 200) {
        setJobList((prevJobList) => prevJobList.filter((job) => job.id !== id));
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  useEffect(() => {
    const getJobList = async () => {
      await delay(2000);
      const res = await axios.get('https://6555b88984b36e3a431e30d7.mockapi.io/api/job');
      setJobList(res.data);
    };
    getJobList();
  }, []);

  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#ECECEC' }}>
        <View style={{ padding: 10, alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: 'black',
            }}
            onPress={() => {
              setEditedJob(null);
              setModal(true);
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Create Job</Text>
          </TouchableOpacity>
        </View>
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }}></View>
        <ScrollView style={{ backgroundColor: '#E6E6E6', paddingTop: 5 }}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              width: '90%',
              marginHorizontal: '5%',
            }}
          >
            {/* {jobList &&
              jobList.map((job) => (
                <Jobs
                  key={job.id}
                  cardWidth={cardWidth}
                  buttonWidth={buttonWidth}
                  cardHeight={cardHeight}
                  cardWeight={cardWeight}
                  fontSize={fontSize}
                  job={job}
                  onEdit={() => handleEdit(job.id)}
                  onDelete={() => handleDelete(job.id)}
                />
              ))} */}
          </View>
        </ScrollView>
      </View>
      <Form
        showModal={modal}
        setShowModal={setModal}
        // width={width}
        // height={height}
        fontSize={fontSize}
        editedJob={editedJob}
        setJobList={(updatedJobList) => setJobList(updatedJobList)}
      />
    </>
  );
};

export default App;
