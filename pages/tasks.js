import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Tasks.module.css';

export default function Tasks() {
  const router = useRouter();
  const [taskName, setTaskName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentTimePosition, setCurrentTimePosition] = useState(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    const updateCurrentTimePosition = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const totalMinutes = (hours + minutes / 60) * 80 + 20;
      const lengthInDay = 1940;
      const percentage = (totalMinutes / lengthInDay) * 100;
      setCurrentTimePosition(percentage);
    };

    updateCurrentTimePosition();
    const interval = setInterval(updateCurrentTimePosition, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskName && startTime && endTime) {
      const newTask = { taskName, startTime, endTime };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTaskName('');
      setStartTime('');
      setEndTime('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setSelectedTask(null);
  };

  const calculatePosition = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = (hours + minutes / 60) * 80 + 20;
    const lengthInDay = 1940;
    const percentage = (totalMinutes / lengthInDay) * 100;
    return percentage;
  };

  const calculateheight = (time) => {
    const totalMinutesInDay = 1940;
    const percentage = (time / totalMinutesInDay) * 100;
    return percentage;
  };

  const calculatetime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = (hours + minutes / 60) * 80 + 20;
    return totalMinutes;
  }

  return (
    <div className={styles.container} onClick={() => setSelectedTask(null)}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <button onClick={() => router.back()} className={styles.backButton}>返回</button>
        <h1>日程规划</h1>
        <form onSubmit={handleAddTask}>
          <label className={styles.formLabel}>
            事项名称:
            <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} className={styles.inputField} />
          </label>
          <label className={styles.formLabel}>
            开始时间:
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className={styles.inputField} />
          </label>
          <label className={styles.formLabel}>
            结束时间:
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className={styles.inputField} />
          </label>
          <button type="submit" className={styles.submitButton}>添加事项</button>
        </form>
        <div className={styles.schedule}>
          <div className={styles.timeArea}>
            {Array.from({ length: 48 }, (_, i) => {
              const time = `${String(Math.floor(i / 2)).padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}`;
              return (
                <div key={i} className={styles.timeLabel}>
                  {time}
                </div>
              );
            })}
          </div>
          <div className={styles.timeline}>
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className={styles.timeSlot}></div>
            ))}
            {tasks.map((task, index) => (
              <div
                key={index}
                className={styles.task}
                style={{
                  top: `${calculatePosition(task.startTime)}%`,
                  height: `${calculateheight(calculatetime(task.endTime)-calculatetime(task.startTime))}%`
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTask({ ...task, index });
                }}
              >
                {task.taskName}
              </div>
            ))}
            {currentTimePosition !== null && (
              <div
                className={styles.currentTimeLine}
                style={{ top: `${currentTimePosition}%` }}
              />
            )}
          </div>
        </div>
        
        {selectedTask && (
          <div className={styles.taskDetails}>
            <h3>事项详情</h3>
            <p>事项名称: {selectedTask.taskName}</p>
            <p>开始时间: {selectedTask.startTime}</p>
            <p>结束时间: {selectedTask.endTime}</p>
            <p>持续时间: {calculatetime(selectedTask.endTime) - calculatetime(selectedTask.startTime)} 分钟</p>
            <button onClick={() => handleDeleteTask(selectedTask.index)} className={styles.deleteButton}>X</button>
          </div>
        )}
      </div>
    </div>
  );
} 