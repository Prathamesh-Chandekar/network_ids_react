import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Shield, AlertTriangle, CheckCircle, Activity, Cpu, Network, Users, Lock, Search, Moon, Sun } from 'lucide-react';

const PreviewDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [searchIP, setSearchIP] = useState('');
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'DDoS Attack Attempt',
      severity: 'high',
      confidence: 98.5,
      sourceIP: '192.168.1.105',
      destinationIP: '10.0.0.1',
      timestamp: '2024-10-30 10:15:23'
    },
    {
      id: 2,
      type: 'Port Scanning',
      severity: 'medium',
      confidence: 85.2,
      sourceIP: '192.168.1.110',
      destinationIP: '10.0.0.2',
      timestamp: '2024-10-30 10:14:55'
    }
  ]);

  const metrics = [
    { icon: Cpu, label: 'Accuracy', value: '95.2%', color: 'text-blue-600' },
    { icon: Network, label: 'Precision', value: '92.8%', color: 'text-green-600' },
    { icon: Users, label: 'Recall', value: '89.5%', color: 'text-yellow-600' },
    { icon: Lock, label: 'F1 Score', value: '90.1%', color: 'text-purple-600' }
  ];

  const trafficData = [
    { name: 'Normal', value: 2450, color: darkMode ? '#4ade80' : '#22c55e' },
    { name: 'Suspicious', value: 150, color: darkMode ? '#fbbf24' : '#d97706' },
    { name: 'Malicious', value: 50, color: darkMode ? '#ef4444' : '#dc2626' }
  ];

  // Simulate network scan
  const startScan = () => {
    setScanning(true);
    // Simulate finding new threats during scan
    const threatTypes = [
      'SQL Injection Attempt',
      'Brute Force Attack',
      'XSS Attack',
      'Directory Traversal',
      'File Inclusion Attempt'
    ];
    
    let scanInterval = setInterval(() => {
      setAlerts(prev => {
        const newAlert = {
          id: Date.now(),
          type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
          severity: Math.random() > 0.5 ? 'high' : 'medium',
          confidence: (Math.random() * 20 + 80).toFixed(1),
          sourceIP: `192.168.1.${Math.floor(Math.random() * 255)}`,
          destinationIP: `10.0.0.${Math.floor(Math.random() * 255)}`,
          timestamp: new Date().toLocaleString()
        };
        return [newAlert, ...prev].slice(0, 10); // Keep last 10 alerts
      });
    }, 3000);

    // Stop scan after 15 seconds
    setTimeout(() => {
      clearInterval(scanInterval);
      setScanning(false);
    }, 15000);
  };

  // Filter alerts based on severity and IP
  const filteredAlerts = alerts.filter(alert => {
    const severityMatch = filterSeverity === 'all' || alert.severity === filterSeverity;
    const ipMatch = !searchIP || 
      alert.sourceIP.includes(searchIP) || 
      alert.destinationIP.includes(searchIP);
    return severityMatch && ipMatch;
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className={`flex items-center justify-between p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-blue-500" />
            <h1 className="text-2xl font-bold">Network Intrusion Detection System</h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <div className="flex items-center space-x-2">
              {darkMode ? 
                <Moon className="h-4 w-4 text-blue-400" /> : 
                <Sun className="h-4 w-4 text-yellow-400" />
              }
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
            {/* Scan Button */}
            <Button 
              onClick={startScan} 
              disabled={scanning}
              className={`flex items-center space-x-2 ${scanning ? 'bg-green-600' : 'bg-blue-600'} hover:bg-blue-700`}
            >
              {scanning ? (
                <>
                  <Activity className="h-4 w-4 animate-pulse" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span>Start Scan</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <Card key={index} className={darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <metric.icon className={metric.color} />
                  <div className="text-2xl font-bold">{metric.value}</div>
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                  {metric.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Traffic Analysis Chart */}
        <Card className={darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardHeader>
            <CardTitle>Traffic Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficData}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={darkMode ? '#374151' : '#e5e7eb'}
                  />
                  <XAxis 
                    dataKey="name" 
                    stroke={darkMode ? '#9ca3af' : '#4b5563'}
                  />
                  <YAxis 
                    stroke={darkMode ? '#9ca3af' : '#4b5563'}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      color: darkMode ? '#ffffff' : '#000000'
                    }}
                  />
                  <Bar dataKey="value" fill={(entry) => entry.color} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Alerts Section with Filters */}
        <Card className={darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span>Security Alerts</span>
              </div>
              <div className="flex items-center space-x-4">
                <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Search by IP"
                  value={searchIP}
                  onChange={(e) => setSearchIP(e.target.value)}
                  className="w-48"
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredAlerts.map((alert) => (
              <Alert 
                key={alert.id} 
                className={
                  darkMode
                    ? alert.severity === 'high'
                      ? 'bg-red-900/20 border-red-900'
                      : 'bg-yellow-900/20 border-yellow-900'
                    : alert.severity === 'high'
                      ? 'bg-red-50 border-red-200'
                      : 'bg-yellow-50 border-yellow-200'
                }
              >
                <AlertTitle className="flex items-center justify-between text-base">
                  <span className={
                    alert.severity === 'high' 
                      ? darkMode ? 'text-red-400' : 'text-red-800'
                      : darkMode ? 'text-yellow-400' : 'text-yellow-800'
                  }>
                    {alert.type}
                  </span>
                  <span className="text-sm">
                    Confidence: {alert.confidence}%
                  </span>
                </AlertTitle>
                <AlertDescription>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div>Source IP: {alert.sourceIP}</div>
                    <div>Destination IP: {alert.destinationIP}</div>
                    <div>Timestamp: {alert.timestamp}</div>
                    <div>Severity: {alert.severity.toUpperCase()}</div>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className={darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="py-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">
                All detection systems operating normally | Last updated: {new Date().toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PreviewDashboard;
