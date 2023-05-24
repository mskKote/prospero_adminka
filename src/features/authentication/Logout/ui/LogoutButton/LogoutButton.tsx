import { useAppDispatch } from '@shared/model'
import { logoutThunk } from '../../model/logout'
import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useFeatureSlicedDebug } from '@shared/lib';

export function LogoutButton() {
  const { rootAttributes } = useFeatureSlicedDebug('feature/LogoutButton')

  const dispatch = useAppDispatch()
  const openModal = () => modals.openConfirmModal({
    title: "Вы уверены?",
    yOffset: "30vh",
    zIndex: 1202,
    onConfirm: () => {
      dispatch(logoutThunk())
    },
    children: (
      <Text size="sm">
        Придётся перезаходить
      </Text>
    ),
    labels: { confirm: 'Выйти', cancel: 'Остаться' },
    onCancel: () => console.log('Cancel'),
  })

  const onLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    e.preventDefault()
    openModal()
  }

  return <div {...rootAttributes}>
    <Button
      variant="gradient"
      gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
      onClick={onLogoutClick}>
      Выйти
    </Button>
  </div>
}
