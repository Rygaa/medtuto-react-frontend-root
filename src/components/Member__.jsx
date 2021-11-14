import classes from 'assets/5-components/root/Member__.module.scss'
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { violet, mauve, blackA, whiteA } from '@radix-ui/colors';
import { styled } from '@stitches/react';
import { updateMemberStatus__ } from 'store/Member/members-actions';
import { useDispatch, useSelector } from 'react-redux';
const StyledSwitch = styled(SwitchPrimitive.Root, {
    all: 'unset',
    width: 42,
    height: 25,
    backgroundColor: "#12262B",
    borderRadius: '9999px',
    position: 'relative',
    boxShadow: `0 2px 10px ${blackA.blackA7}`,
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    '&[data-state="checked"]': { backgroundColor: "#12262B" },
});

const StyledThumb = styled(SwitchPrimitive.Thumb, {
    display: 'block',
    width: 21,
    height: 21,
    backgroundColor: 'white',
    borderRadius: '9999px',
    boxShadow: `0 2px 2px ${blackA.blackA7}`,
    transition: 'transform 100ms',
    transform: 'translateX(2px)',
    willChange: 'transform',
    '&[data-state="checked"]': { transform: 'translateX(19px)', backgroundColor: "#00DBB6" },
});

// Exports
const Switch = StyledSwitch;
const SwitchThumb = StyledThumb;

// Your app...
const Flex = styled('div', { display: 'flex' });
const Label = styled('label', {
    color: 'white',
    fontSize: 15,
    lineHeight: 1,
    userSelect: 'none',
});


const Member__ = (props) => {
    const dispatch = useDispatch();
    const idToken = useSelector((state) => state.user.idToken);
    const testt = (e) => {
        dispatch(updateMemberStatus__({idToken, memberUsername: props.username, newStatus: e}))
    }
    return (
        <div className={classes['member']}>
            <p className={classes['username']}>{props.username}</p>
            <Switch defaultChecked id="s1" onCheckedChange={testt} defaultChecked={(props.isTeacher === 'true')}>
                <SwitchThumb/>
            </Switch>
        </div>
    )
}

export default Member__