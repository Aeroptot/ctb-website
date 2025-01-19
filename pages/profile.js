import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Profile.module.css';

export default function Profile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    chronicDisease: '',
    allergies: '',
    blood_glucose: '',
    blood_fat: '',
    blood_pressure: '',
    uric_acid: '',
    sleepQuality: '',
    preferences: '',
    freeMovement: ''
  });
  const [chatMessages, setChatMessages] = useState([]);
  // const [userInput, setUserInput] = useState('');
  const chatBoxRef = useRef(null);

  useEffect(() => {
    const savedData = localStorage.getItem('userProfile');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(formData));
    alert('已保存');
  };

  const handleGenerateReport = async () => {
    const initialMessage = {
      role: 'user',
      content: `请根据以下信息生成健康报告：${JSON.stringify(formData)}`
    };

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer sk-85443bcbf18b407fa227bfe90e9b4652`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [initialMessage]
      })
    });

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    setChatMessages([...chatMessages, { role: 'ai', content: aiMessage }]);
  };

  // const handleUserInput = async (e) => {
  //   e.preventDefault();
  //   const userMessage = { role: 'user', content: userInput };
  //   const updatedMessages = [...chatMessages, userMessage];

  //   const response = await fetch('https://api.deepseek.com/chat/completions', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer sk-85443bcbf18b407fa227bfe90e9b4652`
  //     },
  //     body: JSON.stringify({
  //       model: 'deepseek-chat',
  //       messages: updatedMessages
  //     })
  //   });

  //   const data = await response.json();
  //   const aiMessage = data.choices[0].message.content;

  //   setChatMessages([...updatedMessages, { role: 'ai', content: aiMessage }]);
  //   setUserInput('');
  // };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <button onClick={() => router.back()} className={styles.backButton}>返回</button>
        <h1>资料填写页</h1>
        <form onSubmit={handleSubmit}>

          <label className={styles.formLabel}>
            姓名:
            <input type="text" name="name" value={formData.name} onChange={handleChange} className={styles.inputField} />
          </label>

          <label className={styles.formLabel}>
            年龄:
            <input type="number" name="age" value={formData.age} onChange={handleChange} className={styles.inputField} />
          </label>

          <label className={styles.formLabel}>
            性别:
            <select name="gender" value={formData.gender} onChange={handleChange} className={styles.inputField}>
              <option value="">请选择</option>
              <option value="male">男</option>
              <option value="female">女</option>
            </select>
          </label>

          <label className={styles.formLabel}>
            身高 (cm):
            <input type="number" name="height" value={formData.height} onChange={handleChange} className={styles.inputField} />
          </label>

          <label className={styles.formLabel}>
            体重 (kg):
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} className={styles.inputField} />
          </label>

          <label className={styles.formLabel}>
            是否有慢性疾病:
            <select name="chronicDisease" value={formData.chronicDisease} onChange={handleChange} className={styles.inputField}>
              <option value="">请选择</option>
              <option value="hypertension">高血压</option>
              <option value="coronaryHeartDisease">冠心病</option>
              <option value="heartFailure">心力衰竭</option>
              <option value="copd">慢性阻塞性肺疾病</option>
              <option value="pneumonia">肺炎</option>
              <option value="pulmonaryFibrosis">肺纤维化</option>
              <option value="diabetes">糖尿病</option>
              <option value="thyroidDisease">甲状腺疾病</option>
              <option value="hyperlipidemia">高血脂症</option>
              <option value="cerebrovascularDisease">脑血管疾病</option>
              <option value="parkinsonsDisease">帕金森病</option>
              <option value="alzheimersDisease">老年痴呆症</option>
              <option value="osteoporosis">骨质疏松症</option>
              <option value="osteoarthritis">骨关节炎</option>
              <option value="rheumatoidArthritis">类风湿关节炎</option>
              <option value="prostaticHyperplasia">前列腺增生</option>
              <option value="chronicNephritis">慢性肾炎</option>
              <option value="chronicGastritis">慢性胃炎</option>
              <option value="constipation">便秘</option>
            </select>
          </label>

          <label className={styles.formLabel}>
            是否对食物过敏:
            <input type="text" name="allergies" value={formData.allergies} onChange={handleChange} className={styles.inputField} />
          </label>

          <label className={styles.formLabel}>
            最近一次体检的血糖值(mmol/L):
            <input type='text' name="blood_glucose" value={formData.blood_glucose} onChange={handleChange} className={styles.inputField}/>
          </label>
          <label className={styles.formLabel}>
            最近一次体检的血脂值(mmol/L):
            <input type='text' name="blood_fat" value={formData.blood_fat} onChange={handleChange} className={styles.inputField}/>
          </label>
          <label className={styles.formLabel}>
            最近一次体检的血压值(mmHg):
            <input type='text' name="blood_pressure" value={formData.blood_pressure} onChange={handleChange} className={styles.inputField}/>
          </label>
          <label className={styles.formLabel}>
            最近一次体检的尿酸值(μmol/L):
            <input type='text' name="uric_acid" value={formData.uric_acid} onChange={handleChange} className={styles.inputField}/>
          </label>

          <label className={styles.formLabel}>
            睡眠质量评分(1-10):
            <input type="number" name="sleepQuality" value={formData.sleepQuality} onChange={handleChange} className={styles.inputField} min="1" max="10" step="1" />
          </label>

          <label className={styles.formLabel}>
            忌口:
            <input type='text' name="preferences" value={formData.preferences} onChange={handleChange} className={styles.inputField}/>
          </label>

          <label className={styles.formLabel}>
            是否可以自由活动:
            <select name="freeMovement" value={formData.freeMovement} onChange={handleChange} className={styles.inputField}>
              <option value="">请选择</option>
              <option value="yes">是</option>
              <option value="no">否</option>
            </select>
          </label>

          <button type="submit" className={styles.submitButton}>保存</button>
        </form>
        <button onClick={handleGenerateReport} className={styles.generateReportButton}>生成报告</button>
        <div className={styles.chatBox} ref={chatBoxRef}>
          {chatMessages.map((msg, index) => (
            <div key={index} className={msg.role === 'user' ? styles.userMessage : styles.aiMessage}>
              {msg.content.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 