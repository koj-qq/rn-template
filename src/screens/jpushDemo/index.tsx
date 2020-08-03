import React from 'react';
import { Container } from '@/components';
import { ScrollView, Button } from 'react-native';
import JPush from 'jpush-react-native';

export default () => {
  return (
    <Container>
      <ScrollView>
        <Button title="setLoggerEnable" onPress={() => JPush.setLoggerEnable(true)} />
        <Button
          title="getRegisterID"
          onPress={() => JPush.getRegistrationID(result => console.log('registerID:' + JSON.stringify(result)))}
        />
        <Button title="addTags" onPress={() => JPush.addTags({ sequence: 1, tags: ['1', '2', '3'] })} />
        <Button title="updateTags" onPress={() => JPush.updateTags({ sequence: 2, tags: ['4', '5', '6'] })} />
        <Button title="deleteTag" onPress={() => JPush.deleteTag({ sequence: 3, tags: ['4', '5', '6'] })} />
        <Button title="deleteTags" onPress={() => JPush.deleteTags({ sequence: 4 })} />
        <Button title="queryTag" onPress={() => JPush.queryTag({ sequence: 4, tag: '1' })} />
        <Button title="queryTags" onPress={() => JPush.queryTags({ sequence: 5 })} />
        <Button title="setAlias" onPress={() => JPush.setAlias({ sequence: 6, alias: 'xxx' })} />
        <Button title="deleteAlias" onPress={() => JPush.deleteAlias({ sequence: 7 })} />
        <Button title="queryAlias" onPress={() => JPush.queryAlias({ sequence: 8 })} />
        <Button
          title="setMobileNumber"
          onPress={() => JPush.setMobileNumber({ mobileNumber: '13888888888', sequence: 3 })}
        />
        <Button title="setBadge" onPress={() => JPush.setBadge({ badge: 1, appBadge: 1 })} />
        <Button title="initCrashHandler" onPress={() => JPush.initCrashHandler()} />
        <Button
          title="addLocalNotification"
          onPress={() =>
            JPush.addLocalNotification({
              messageID: '123456789',
              title: 'title123',
              content: 'content123',
              extras: { key123: 'value123' },
            })
          }
        />
        <Button
          title="removeLocalNotification"
          onPress={() => JPush.removeLocalNotification({ messageID: '123456789' })}
        />
      </ScrollView>
    </Container>
  );
};
