import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { getRecords } from "./contract_function";

const GetRecords: React.FC = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const records = await getRecords();
        console.log(records);
        setRecords(records);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      {records.map((record, index) => (
        <View
          key={index}
          style={{
            marginBottom: 15,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            paddingBottom: 10,
          }}
        >
          <Text>
            <strong>ID:</strong> {record.id}
          </Text>
          <Text>
            <strong>From:</strong> {record.from}
          </Text>
          <Text>
            <strong>To:</strong> {record.to}
          </Text>
          <Text>
            <strong>Prescription:</strong> {record.prescription}
          </Text>
          <Text>
            <strong>Timestamp:</strong>{" "}
            {new Date(record.timestamp * 1000).toLocaleString()}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default GetRecords;
