import React from 'react'
import { useAddSourceAndPublisherMutation } from '@entities/sources'
import { Button, Flex, Group, Modal, NumberInput, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import classes from "./AddSource.module.scss"
import { AddEnrichSourceDTO } from '@entities/sources/api/types'


export const AddSource = () => {
  const [trigger] = useAddSourceAndPublisherMutation()
  function fireAddSourceAPI(values: AddEnrichSourceDTO) {
    trigger(values)
  }


  const [opened, { open, close }] = useDisclosure(false);

  const rand = Date.now()
  const form = useForm<AddEnrichSourceDTO>({
    initialValues: {
      name: `The Random ${rand % 100000}`,
      country: "US",
      city: "New York",
      latitude: (55.75 - 1 + Math.random() * 2),
      longitude: (37.57 - 1 + Math.random() * 2),
      rss_url: `https://random.com/rss/${rand}`
    },
  });




  return (<>
    <Modal zIndex={1200} opened={opened} onClose={close} title="Добавить RSS источник" centered>
      <form onSubmit={form.onSubmit((values) => fireAddSourceAPI(values))}>
        <Flex direction={"column"} rowGap={"md"}>

          <TextInput
            withAsterisk
            label="Название"
            placeholder="name"
            {...form.getInputProps('name')}
          />

          <Flex direction={"row"} gap={'md'} justify={"space-between"}>
            <TextInput
              withAsterisk
              label="Страна"
              placeholder="country"
              {...form.getInputProps('country')}
            />
            <TextInput
              withAsterisk
              label="Город"
              placeholder="city"
              {...form.getInputProps('city')}
            />
          </Flex>

          <Flex direction={"row"} gap={'md'} justify={"space-between"}>
            <NumberInput
              withAsterisk
              label="longitude"
              placeholder="longitude"
              {...form.getInputProps('longitude')}
            />
            <NumberInput
              withAsterisk
              label="latitude"
              placeholder="latitude"
              {...form.getInputProps('latitude')}
            />
          </Flex>

          <TextInput
            withAsterisk
            label="rss_url"
            placeholder="rss_url"
            {...form.getInputProps('rss_url')}
          />

          <Button
            variant="gradient" gradient={{ from: 'orange', to: 'red' }}
            type='submit'
            onClick={close}
          >
            ADD+
          </Button>
        </Flex>
      </form>
    </Modal>

    <Button
      variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}
      className={classes.addBtn}
      onClick={open}
    >
      ADD+
    </Button>
  </>
  )
}
